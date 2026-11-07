import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- deterministic helpers ---------- */
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

export type Tier = "high" | "medium" | "low";

/* Scroll keyframes: camera is a pure function of page progress (reversible). */
const KEYS: { p: number; pos: [number, number, number]; look: [number, number, number]; dim: number }[] = [
  { p: 0.0, pos: [0, 2.6, 20], look: [0, 7, -40], dim: 1 },
  { p: 0.14, pos: [0, 8, 12], look: [0, 6, -30], dim: 0.9 },
  { p: 0.45, pos: [0, 16, 6], look: [0, 18, -30], dim: 0.75 },
  { p: 0.62, pos: [0, 20, 2], look: [0, 26, -30], dim: 0.7 },
  { p: 0.75, pos: [0, 4, 14], look: [0, 2, -40], dim: 0.8 },
  { p: 0.88, pos: [0, 6, 18], look: [0, 6, -20], dim: 0.45 },
  { p: 1.0, pos: [0, 2.6, 22], look: [0, 7, -40], dim: 1 },
];
export function sampleTimeline(p: number) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1]!.p) i++;
  const a = KEYS[i]!, b = KEYS[i + 1]!;
  const t = ease(Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p))));
  return {
    pos: a.pos.map((v, k) => lerp(v, b.pos[k] ?? v, t)) as [number, number, number],
    look: a.look.map((v, k) => lerp(v, b.look[k] ?? v, t)) as [number, number, number],
    dim: lerp(a.dim, b.dim, t),
  };
}

const shared = { progress: 0, dim: 1 };

/* ---------- Sky ---------- */
function Sky() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uDim: { value: 1 } },
    vertexShader: `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec3 vP; uniform float uDim;
      void main(){ float y = vP.y;
        vec3 top = vec3(0.012,0.04,0.12), mid = vec3(0.04,0.105,0.30), hor = vec3(0.12,0.42,1.0), cyan=vec3(0.18,0.8,1.0);
        vec3 c = mix(hor, mid, smoothstep(0.0,0.25,y)); c = mix(c, top, smoothstep(0.25,0.8,y));
        c = mix(c, cyan, exp(-abs(y-0.01)*40.)*0.35);
        c *= mix(0.5,1.,uDim);
        if (y < 0.) c = mix(vec3(0.02,0.05,0.14), hor*0.3, exp(y*30.));
        gl_FragColor = vec4(c,1.);}`,
  }), []);
  useFrame(() => { mat.uniforms["uDim"]!.value = shared.dim; });
  useEffect(() => () => mat.dispose(), [mat]);
  return <mesh material={mat}><sphereGeometry args={[400, 32, 16]} /></mesh>;
}

/* ---------- Skyline with shader windows ---------- */
function Skyline({ tier }: { tier: Tier }) {
  const count = tier === "high" ? 360 : tier === "medium" ? 200 : 100;
  const ref = useRef<THREE.InstancedMesh>(null);
  const { geo, mat } = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 1, 1); g.translate(0, 0.5, 0);
    const rnd = mulberry32(42);
    const scales = new Float32Array(count * 3), rands = new Float32Array(count);
    const mats: THREE.Matrix4[] = [];
    const layers = tier === "low" ? 3 : 4;
    for (let i = 0; i < count; i++) {
      const layer = i % layers;
      const z = -55 - layer * 22 - rnd() * 10;
      const x = (rnd() - 0.5) * (140 + layer * 70);
      const centre = Math.exp(-(x * x) / 900);
      let h = 4 + rnd() * 10 + centre * 22 * rnd() + layer * 4;
      if (x < -14 && x > -40 && layer === 0) h += 10 + rnd() * 10; // tall framing towers left
      if (i === 7) h = 52; // landmark spire
      const w = 2 + rnd() * 3, d = 2 + rnd() * 3;
      scales.set([w, h, d], i * 3); rands[i] = rnd();
      mats.push(new THREE.Matrix4().compose(new THREE.Vector3(i === 7 ? 4 : x, 0, i === 7 ? -48 : z), new THREE.Quaternion(), new THREE.Vector3(i === 7 ? 1.6 : w, h, i === 7 ? 1.6 : d)));
    }
    g.setAttribute("aScale", new THREE.InstancedBufferAttribute(scales, 3));
    g.setAttribute("aRand", new THREE.InstancedBufferAttribute(rands, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uDim: { value: 1 } },
      vertexShader: `attribute vec3 aScale; attribute float aRand; varying vec2 vUv; varying vec3 vN; varying float vR; varying vec3 vS; varying float vDepth; varying float vY;
        void main(){ vUv = uv; vN = normal; vR = aRand; vS = aScale; vY = position.y;
          vec4 mv = modelViewMatrix * instanceMatrix * vec4(position,1.); vDepth = -mv.z; gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `varying vec2 vUv; varying vec3 vN; varying float vR; varying vec3 vS; varying float vDepth; varying float vY; uniform float uTime; uniform float uDim;
        float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
        void main(){
          vec3 base = vec3(0.02,0.04,0.10);
          vec3 col = base;
          if (abs(vN.y) < 0.5) {
            float wd = abs(vN.x) > 0.5 ? vS.z : vS.x;
            vec2 g = vUv * vec2(wd*1.6, vS.y*1.4);
            vec2 c = floor(g); vec2 f = fract(g);
            float win = step(0.18,f.x)*step(f.x,0.78)*step(0.25,f.y)*step(f.y,0.75);
            float r = h(c + vR*91.);
            float on = step(0.58, r);
            float flick = step(0.995, h(c+7.)) * (0.5+0.5*sin(uTime*0.7 + r*40.));
            vec3 tint = mix(vec3(0.75,0.88,1.0), vec3(0.3,0.8,1.0), step(0.8,h(c+3.)));
            tint = mix(tint, vec3(1.0,0.85,0.6), step(0.96,h(c+5.)));
            col += win * (on * (0.6+0.6*h(c+1.)) - flick*on*0.5) * tint * 1.4;
            float rim = smoothstep(0.92,1.0,abs(vUv.x*2.-1.)) * 0.25;
            col += vec3(0.15,0.45,1.0)*rim;
            col *= mix(0.55,1.0, smoothstep(0.,6.,vY));
          }
          float fog = 1. - exp(-pow(vDepth*0.012,2.));
          col = mix(col, vec3(0.06,0.16,0.42), fog*0.85);
          gl_FragColor = vec4(col*mix(0.55,1.,uDim),1.);
        }`,
    });
    g.userData["mats"] = mats;
    return { geo: g, mat: m };
  }, [count, tier]);
  useEffect(() => {
    const mats = geo.userData["mats"] as THREE.Matrix4[];
    mats.forEach((m, i) => ref.current?.setMatrixAt(i, m));
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
    return () => { geo.dispose(); mat.dispose(); };
  }, [geo, mat]);
  useFrame(({ clock }) => { mat.uniforms["uTime"]!.value = clock.elapsedTime; mat.uniforms["uDim"]!.value = shared.dim; });
  return <instancedMesh ref={ref} args={[geo, mat, count]} frustumCulled={false} />;
}

/* ---------- Water with faked reflection streaks ---------- */
function Water() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    transparent: false,
    uniforms: { uTime: { value: 0 }, uDim: { value: 1 } },
    vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.); vW = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `varying vec3 vW; uniform float uTime; uniform float uDim;
      float h(float x){ return fract(sin(x*12.9898)*43758.5453); }
      float n(float x){ float i=floor(x), f=fract(x); return mix(h(i),h(i+1.),f*f*(3.-2.*f)); }
      void main(){
        float dist = clamp((-vW.z + 20.)/75., 0., 1.);
        float rip = sin(vW.z*1.3 + uTime*0.8)*0.35 + sin(vW.z*3.1 - uTime*0.6)*0.15;
        float x = vW.x*1.4 + rip;
        float streak = pow(n(x), 6.) * 1.6 + pow(n(x*0.37+5.),10.)*1.2;
        vec3 sc = mix(vec3(0.3,0.6,1.0), vec3(0.85,0.93,1.0), n(x*2.));
        sc = mix(sc, vec3(1.0,0.75,0.4), step(0.93, n(x*0.9+11.))*0.8);
        vec3 col = vec3(0.01,0.025,0.07) + sc * streak * smoothstep(0.0,1.0,dist) * 0.55;
        col += vec3(0.1,0.35,0.9) * pow(dist,4.) * 0.5;
        col *= smoothstep(-0.05, 0.6, dist);
        gl_FragColor = vec4(col*mix(0.5,1.,uDim),1.);
      }`,
  }), []);
  useFrame(({ clock }) => { mat.uniforms["uTime"]!.value = clock.elapsedTime; mat.uniforms["uDim"]!.value = shared.dim; });
  useEffect(() => () => mat.dispose(), [mat]);
  return <mesh material={mat} rotation-x={-Math.PI / 2} position={[0, 0, -20]}><planeGeometry args={[500, 160]} /></mesh>;
}

/* ---------- Hero ring + hologram panel ---------- */
function HeroGroup() {
  const g = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const panelMat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec2 vUv; uniform float uTime;
      void main(){
        vec2 u = vUv; vec3 c = vec3(0.); float a = 0.;
        float e = min(min(u.x,1.-u.x),min(u.y,1.-u.y));
        a += smoothstep(0.012,0.0,e)*1.0 + smoothstep(0.08,0.,e)*0.25;
        a += 0.07;
        vec2 gr = fract(u*vec2(12.,8.)); a += (step(gr.x,0.02)+step(gr.y,0.03))*0.06;
        float path = 0.35 + 0.18*sin(u.x*5.0+1.2) + 0.08*sin(u.x*11.0);
        if (u.x>0.06 && u.x<0.62) a += smoothstep(0.012,0.,abs(u.y-path))*0.9;
        for (int i=0;i<7;i++){ float fi=float(i); float bx=0.08+fi*0.075; float bh=0.08+0.05*fract(sin(fi*3.1)*9.)+0.02*sin(uTime*0.3+fi);
          if (u.x>bx && u.x<bx+0.04 && u.y>0.08 && u.y<0.08+bh) a += 0.22; }
        vec2 d = (u-vec2(0.8,0.55))*vec2(1.6,1.); float r = length(d);
        float ang = atan(d.y,d.x);
        a += smoothstep(0.02,0.0,abs(r-0.14))*(0.5+0.5*step(0.,sin(ang*1.0+0.6)));
        a += smoothstep(0.012,0.0,abs(r-0.09))*0.4;
        c = mix(vec3(0.2,0.55,1.0), vec3(0.6,0.9,1.0), a);
        gl_FragColor = vec4(c*a, 1.);
      }`,
  }), []);
  useEffect(() => () => panelMat.dispose(), [panelMat]);
  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    panelMat.uniforms["uTime"]!.value = t;
    const portrait = size.width < size.height;
    if (g.current) {
      const fade = Math.max(0, 1 - shared.progress * 9);
      g.current.visible = fade > 0.01 || shared.progress > 0.97;
      g.current.position.set(portrait ? 0 : 6.5, portrait ? 9.5 : 6.5, 6 + Math.sin(t * 0.5) * 0.08);
      g.current.scale.setScalar(portrait ? 0.6 : 1);
      g.current.rotation.y = -0.35 + pointer.x * 0.04;
      g.current.rotation.x = pointer.y * 0.03;
    }
    if (ring.current) ring.current.rotation.z = t * 0.05;
    if (ring2.current) ring2.current.rotation.z = -t * 0.025;
  });
  return (
    <group ref={g}>
      <mesh material={panelMat} rotation={[0, 0, 0.04]}><planeGeometry args={[6.4, 4]} /></mesh>
      <group rotation={[1.25, 0.25, 0]}>
        <group ref={ring} scale={[1.55, 1, 1]}>
          <mesh><torusGeometry args={[5, 0.025, 8, 200]} /><meshBasicMaterial color="#bfeaff" toneMapped={false} /></mesh>
          <mesh><torusGeometry args={[5, 0.16, 8, 200]} /><meshBasicMaterial color="#2FD0FF" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
        </group>
        <mesh ref={ring2} scale={[1.7, 1.12, 1]}><torusGeometry args={[5, 0.015, 6, 200]} /><meshBasicMaterial color="#2D8CFF" transparent opacity={0.4} toneMapped={false} /></mesh>
      </group>
    </group>
  );
}

/* ---------- Globe (About onward) ---------- */
function Globe() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 2200, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      pos.set([Math.cos(th) * r * 6, y * 6, Math.sin(th) * r * 6], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = shared.progress;
    const vis = Math.min(1, Math.max(0, (p - 0.08) * 8)) * (p > 0.72 ? Math.max(0.25, 1 - (p - 0.72) * 6) : 1);
    ref.current.visible = vis > 0.01;
    (ref.current.material as THREE.PointsMaterial).opacity = vis * 0.8;
    ref.current.rotation.y = p * Math.PI * 2 + clock.elapsedTime * 0.02;
    ref.current.position.set(0, lerp(10, 22, Math.min(1, p * 2)), -28);
  });
  return <points ref={ref} geometry={geo}><pointsMaterial color="#9fd8ff" size={0.09} transparent opacity={0} depthWrite={false} /></points>;
}

/* ---------- Particles ---------- */
function Particles({ tier }: { tier: Tier }) {
  const n = tier === "high" ? 7000 : tier === "medium" ? 3000 : 1000;
  const { geo, mat } = useMemo(() => {
    const rnd = mulberry32(7), pos = new Float32Array(n * 3), r = new Float32Array(n);
    for (let i = 0; i < n; i++) { pos.set([(rnd() - 0.5) * 160, rnd() * 70, -rnd() * 110 + 15], i * 3); r[i] = rnd(); }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); g.setAttribute("aR", new THREE.BufferAttribute(r, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uTime: { value: 0 } },
      vertexShader: `attribute float aR; uniform float uTime; varying float vR;
        void main(){ vR=aR; vec3 p=position; p.x += sin(uTime*0.05+aR*20.)*1.5; p.y += cos(uTime*0.04+aR*13.)*1.;
          vec4 mv = modelViewMatrix*vec4(p,1.); gl_PointSize = (0.6+aR*1.6)*40./-mv.z; gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `varying float vR; void main(){ float d=length(gl_PointCoord-.5); float a=smoothstep(.5,0.,d);
        vec3 c = vR>0.985 ? vec3(1.,.8,.4) : vec3(.7,.85,1.); gl_FragColor=vec4(c, a*(0.25+vR*0.5)); }`,
    });
    return { geo: g, mat: m };
  }, [n]);
  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);
  useFrame(({ clock }) => { mat.uniforms["uTime"]!.value = clock.elapsedTime; });
  return <points geometry={geo} material={mat} />;
}

/* ---------- Light pathway (How it works) ---------- */
function Pathway() {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(-6, 0.05, 14), new THREE.Vector3(3, 0.05, 2), new THREE.Vector3(-3, 0.05, -12), new THREE.Vector3(2, 0.05, -28)]), []);
  const mat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uP: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec2 vUv; uniform float uP; void main(){ float on = step(1.-vUv.x, uP);
      vec3 c = mix(vec3(0.3,0.7,1.), vec3(1.,.8,.4), step(0.97, fract(vUv.x*4.))); gl_FragColor = vec4(c, on*0.9); }`,
  }), []);
  useEffect(() => () => mat.dispose(), [mat]);
  useFrame(() => { mat.uniforms["uP"]!.value = Math.min(1, Math.max(0, (shared.progress - 0.66) / 0.1)); });
  return <mesh ref={ref} material={mat}><tubeGeometry args={[curve, 120, 0.08, 6, false]} /></mesh>;
}

function Rig({ reduced }: { reduced: boolean }) {
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, pointer, size }) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    shared.progress = reduced ? 0 : max > 0 ? Math.min(1, window.scrollY / max) : 0;
    const s = sampleTimeline(shared.progress);
    shared.dim = s.dim;
    const portrait = size.width < size.height;
    camera.position.set(s.pos[0] + pointer.x * 0.3, s.pos[1] + (portrait ? 1 : 0), s.pos[2] + (portrait ? 8 : 0));
    look.set(s.look[0], s.look[1], s.look[2]);
    camera.lookAt(look);
  });
  return null;
}

export default function Experience({ tier, paused, reduced, onReady }: { tier: Tier; paused: boolean; reduced: boolean; onReady: () => void }) {
  const dpr: [number, number] = tier === "high" ? [1, 2] : tier === "medium" ? [1, 1.5] : [1, 1.25];
  return (
    <Canvas
      aria-hidden="true" role="presentation"
      dpr={dpr} frameloop={paused ? "never" : "always"}
      camera={{ fov: 50, near: 0.1, far: 900, position: [0, 2.2, 20] }}
      gl={{ antialias: tier !== "low", powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault());
        requestAnimationFrame(() => requestAnimationFrame(onReady));
      }}
    >
      <Sky />
      <Skyline tier={tier} />
      <Water />
      <HeroGroup />
      <Globe />
      <Particles tier={tier} />
      <Pathway />
      <Rig reduced={reduced} />
    </Canvas>
  );
}

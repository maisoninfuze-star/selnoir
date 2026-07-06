import { fal } from "@fal-ai/client";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error("No FAL_KEY"); process.exit(1); }
fal.config({ credentials: FAL_KEY });

const IMG_DIR = "/Users/inder/Claude/Projects/Sel noir/public/images";
const OUT = "/Users/inder/Claude/Projects/Sel noir/public/video";
await mkdir(OUT, { recursive: true });

const MODEL = "fal-ai/kling-video/v1.6/standard/image-to-video";

const JOBS = [
  {
    name: "crystal",
    src: "salt-macro.jpg",
    ratio: "1:1",
    prompt:
      "extreme slow cinematic rotation of the black salt crystals, the camera slowly orbits, " +
      "tiny salt grains and embers drift upward through the air, warm ember light glints across the facets, " +
      "wisps of smoke curl, dark luxe, hypnotic, seamless, no people",
  },
  {
    name: "hero",
    src: "hero-grill.jpg",
    ratio: "16:9",
    prompt:
      "live fire flames flicker and dance over the steak, embers float up, smoke rises slowly, " +
      "very subtle slow push-in toward the grill, candle flame flickers, cinematic dark luxe steakhouse, " +
      "atmospheric, seamless loop, no people, no camera shake",
  },
];

async function run(job) {
  const buf = await readFile(`${IMG_DIR}/${job.src}`);
  const blob = new Blob([buf], { type: "image/jpeg" });
  console.log(`[${job.name}] uploading ${job.src}...`);
  const image_url = await fal.storage.upload(blob);
  console.log(`[${job.name}] submitting to ${MODEL}...`);
  const result = await fal.subscribe(MODEL, {
    input: { prompt: job.prompt, image_url, duration: "5", aspect_ratio: job.ratio },
    logs: false,
    onQueueUpdate: (u) => { if (u.status) process.stdout.write(`[${job.name}] ${u.status}\r`); },
  });
  const url = result?.data?.video?.url;
  if (!url) throw new Error(`[${job.name}] no video url: ${JSON.stringify(result?.data)}`);
  console.log(`\n[${job.name}] downloading ${url}`);
  const vbuf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(`${OUT}/${job.name}.mp4`, vbuf);
  console.log(`[${job.name}] OK -> ${OUT}/${job.name}.mp4 (${(vbuf.length/1e6).toFixed(2)} MB)`);
}

const res = await Promise.allSettled(JOBS.map(run));
res.forEach((r, i) => { if (r.status === "rejected") console.error("ERR", JOBS[i].name, r.reason?.message || r.reason); });
console.log("DONE");

/* Generates a minimal, valid PDF at public/resume.pdf.
   Edit the `lines` array and re-run `npm run make-resume`. */

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const out  = resolve(here, '..', 'public', 'resume.pdf')
mkdirSync(dirname(out), { recursive: true })

const B = 'F1'  // Helvetica-Bold
const R = 'F2'  // Helvetica

const lines = [
  /* Header */
  { f: B, s: 28, x: 72, y: 760, t: 'Ruslan Somin' },
  { f: R, s: 12, x: 72, y: 738, t: 'Senior AI Engineer · Full-Stack Developer' },
  { f: R, s: 10, x: 72, y: 722, t: 'Kyiv, Ukraine · Remote · LinkedIn' },

  /* Summary */
  { f: B, s: 13, x: 72, y: 688, t: 'Summary' },
  { f: R, s: 10, x: 72, y: 670, t: 'Senior AI Engineer and Full-Stack Developer with seven years of experience building LLM applications,' },
  { f: R, s: 10, x: 72, y: 656, t: 'retrieval-augmented generation, intelligent search, and workflow automation. End-to-end ownership across' },
  { f: R, s: 10, x: 72, y: 642, t: 'backend architecture, APIs, orchestration, retrieval pipelines, frontends, and deployment.' },

  /* Experience */
  { f: B, s: 13, x: 72, y: 606, t: 'Experience' },

  /* TwilightCore */
  { f: B, s: 11, x: 72, y: 584, t: 'Lead Software Engineer    TwilightCore.AI    Oct 2025 – Present    Remote' },
  { f: R, s:  9, x: 84, y: 568, t: '· Designed backend services for model orchestration and retrieval pipelines.' },
  { f: R, s:  9, x: 84, y: 556, t: '· Integrated AI capabilities into web applications with usability and maintainability as first-class concerns.' },
  { f: R, s:  9, x: 84, y: 544, t: '· Led deployment and iterative refinement across application and infrastructure layers.' },

  /* Red Canary */
  { f: B, s: 11, x: 72, y: 516, t: 'Senior AI Engineer    Red Canary (Zscaler)    May 2023 – Sep 2025    Remote' },
  { f: R, s:  9, x: 84, y: 500, t: '· Designed and delivered AI-powered systems for knowledge assistants and semantic search.' },
  { f: R, s:  9, x: 84, y: 488, t: '· Built retrieval-augmented generation pipelines including document ingestion and vector search.' },
  { f: R, s:  9, x: 84, y: 476, t: '· Developed backend services in Python and FastAPI for API workflows and system integration.' },
  { f: R, s:  9, x: 84, y: 464, t: '· Deployed containerised services on Docker, Kubernetes, AWS, and Azure.' },

  /* PointClickCare */
  { f: B, s: 11, x: 72, y: 436, t: 'Full-Stack Engineer    PointClickCare    Jan 2021 – Apr 2023    Remote' },
  { f: R, s:  9, x: 84, y: 420, t: '· Built full-stack applications on React, Next.js, Node.js, Express, and PostgreSQL.' },
  { f: R, s:  9, x: 84, y: 408, t: '· Developed backend APIs for authentication, reporting, and workflow management.' },
  { f: R, s:  9, x: 84, y: 396, t: '· Introduced AI-assisted features like semantic search.' },
  { f: R, s:  9, x: 84, y: 384, t: '· Contributed to CI/CD and cloud delivery on Docker, GitHub Actions, and AWS.' },

  /* Productboard */
  { f: B, s: 11, x: 72, y: 356, t: 'Software Engineer    Productboard    Jul 2019 – Dec 2020    Remote' },
  { f: R, s:  9, x: 84, y: 340, t: '· Backend functionality in Python, Flask, and Django for internal applications and automation.' },
  { f: R, s:  9, x: 84, y: 328, t: '· React-based dashboards for operational visibility and internal workflows.' },
  { f: R, s:  9, x: 84, y: 316, t: '· NLP functionality with Scikit-learn, TensorFlow, and Hugging Face Transformers.' },

  /* Education */
  { f: B, s: 13, x: 72, y: 282, t: 'Education' },
  { f: B, s: 11, x: 72, y: 260, t: 'The Hong Kong Polytechnic University    2014 – 2018' },
  { f: R, s: 10, x: 72, y: 244, t: 'Bachelor of Science, Computer Science' },

  /* Focus */
  { f: B, s: 13, x: 72, y: 210, t: 'Focus' },
  { f: R, s: 10, x: 72, y: 192, t: 'LLM applications · RAG systems · Intelligent search · Workflow automation · Full-stack product engineering' },

  /* Stack */
  { f: B, s: 13, x: 72, y: 160, t: 'Stack' },
  { f: R, s: 10, x: 72, y: 142, t: 'Python, FastAPI, Django, Node.js, TypeScript, React, Next.js, LangChain, LangGraph' },
  { f: R, s: 10, x: 72, y: 128, t: 'PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, Azure, OpenAI API, Anthropic API' },
]

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

let stream = ''
for (const l of lines) stream += `BT /${l.f} ${l.s} Tf ${l.x} ${l.y} Td (${esc(l.t)}) Tj ET\n`
const streamBytes = Buffer.from(stream, 'latin1')

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>',
  `<< /Length ${streamBytes.length} >>\nstream\n${stream}endstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
]

const chunks = []
const push = (s) => chunks.push(Buffer.from(s, 'latin1'))
push('%PDF-1.4\n%âãÏÓ\n')

const offsets = []
for (let i = 0; i < objects.length; i++) {
  offsets.push(chunks.reduce((n, b) => n + b.length, 0))
  push(`${i + 1} 0 obj\n${objects[i]}\nendobj\n`)
}

const xrefOffset = chunks.reduce((n, b) => n + b.length, 0)
let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (const o of offsets) xref += String(o).padStart(10, '0') + ' 00000 n \n'
push(xref)
push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)

const pdf = Buffer.concat(chunks)
writeFileSync(out, pdf)
console.log(`wrote ${out} (${pdf.length} bytes)`)

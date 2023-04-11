import { experiments } from "@/data/experiments";

export default function Experiments() {
  return (
    <main className="max-w-xl sm:pt-[12.25rem]">
      {experiments.map((experiment) => (
        <Experiment key={experiment.id} {...experiment} />
      ))}
    </main>
  )
}

function Experiment(experiment: Experiment) {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">{experiment.name}</h1>
    </div>
  )
}
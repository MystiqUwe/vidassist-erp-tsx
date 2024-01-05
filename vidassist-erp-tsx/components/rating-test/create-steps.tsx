type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
  ratingCriteria:
    | {
        id: string;
        name: string;
        description: string;
        position: number;
      }[]
    | undefined;
};

const CreateSteps = ({ currentStepIndex, goTo, ratingCriteria }: NavProps) => {
  const isStepRated = (position: number) => {
    const value = sessionStorage.getItem(`${ratingCriteria?.[position]?.id}`);
    console.log(value);
    if (value && parseInt(value) > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="py-5 text-slate-200 bg-neutral-900 h-full rounded-md border border-neutral-700 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          {ratingCriteria && ratingCriteria.length > 0 ? (
            ratingCriteria.map((criteria) => (
              <li
                className="flex flex-col items-start font-medium"
                key={criteria.id}
              >
                <span className="hidden text-neutral-500 uppercase text-sm md:flex">
                  step {criteria.position + 1}
                </span>
                <button
                  tabIndex={criteria.position}
                  onClick={() => goTo(criteria.position)}
                  className={`text-sm break-all ${
                    currentStepIndex === criteria.position
                      ? "text-[#ffe666]"
                      : "text-white"
                  }                   ${
                    isStepRated(criteria.position)
                      ? "text-[#46d84e]"
                      : "text-white"
                  } md:text-base`}
                >
                  {criteria.name}
                </button>
              </li>
            ))
          ) : (
            <div>nothing</div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default CreateSteps;

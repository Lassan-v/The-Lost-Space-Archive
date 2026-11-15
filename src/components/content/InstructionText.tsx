/**
 * InstructionText — The Lost Space Archive
 * Challenge instructions with inline term definitions
 */

interface InstructionTextProps {
  instruction: string;
  termDefinitions?: Record<string, string>;
  id?: string;
}

export function InstructionText({ instruction, termDefinitions, id }: InstructionTextProps) {
  return (
    <div className="instruction-text" id={id} role="group" aria-labelledby={id}>
      <p>{instruction}</p>
      {termDefinitions && (
        <ul className="instruction-text__definitions">
          {Object.entries(termDefinitions).map(([term, def]) => (
            <li key={term} className="instruction-text__definition">
              <strong className="instruction-text__definition-term">{term}</strong>:
              <span className="instruction-text__definition-text"> {def}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./css/LiveConsole.css";

const LiveConsole = () => {
  const [data, setData] = useState<any[]>([]);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/LiveConsole");
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader!.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          chunk.split("\n").forEach((line) => {
            if (line.trim()) {
              const newRow = JSON.parse(line); // Parse each line as JSON
              setData((prev) => [...prev, newRow]); // Append new data
            }
          });
        }
      }
    };

    fetchData();
    
  }, [on && data]);

  return (
    <div className="flex justify-center items-center flex-col">
      {on ? (
        <>
          <ul className="w-full h-[87vh] bg-primary rounded-sm p-2 overflow-y-auto">
            <TransitionGroup component={null}>
              {data.map((row, index) => (
                <CSSTransition
                  key={index}
                  timeout={300}
                  classNames="fade"
                >
                  <li className="w-full text-secondary border-dashed border-2 border-secondary p-2 mb-2">
                    <div>
                      {" - - - - Parent name -> " +
                        row["Parent_Name"] +
                        " - - - - | - - - - " +
                        "Child name -> " +
                        row["Child_Name"] +
                        " - - - - " +
                        "| - - - - Time Stamp -> " +
                        row["Timestamp"] +
                        " - - - - "}
                    </div>
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>
          <Button
            variant="secondary"
            onClick={() => setOn(false)}
            className="w-full text-red-500"
          >
            close console
          </Button>
        </>
      ) : (
        <Button variant="secondary" onClick={() => setOn(true)}>
          open console
        </Button>
      )}
    </div>
  );
};

export default LiveConsole;

import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "/node_modules/uplot/dist/uPlot.min.css";

function Chart(props) {
  const plotRef = useRef();

  useEffect(() => {
    new uPlot(props.options, props.data, plotRef.current);
  }, [props]);
  return (
    <div>
      <div ref={plotRef}></div>
    </div>
  );
}

export default Chart;

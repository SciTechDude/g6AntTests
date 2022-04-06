import { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import G6 from "@antv/g6";

const graphData = {
    nodes: [
      { id: "node1", label: "1" },
      { id: "node2", label: "2" },
      { id: "node3", label: "3" },
      { id: "node4", label: "4" },
    ],
    edges: [
		{ source: "node1", target: "node2" },
		{ source: "node1", target: "node3" },
		{ source: "node2", target: "node3" },
		{ source: "node2", target: "node4" },
	],
  };

let graph = null;

const G6GraphTest = (props) => {
	console.dir(props);
	const ref = useRef(null);

	useEffect(() => {
		if (!graph) {
			graph = ref.current && new G6.Graph({
				container: ReactDOM.findDOMNode(ref.current),
				width: 800,
				height: 600,
				fitView: true,
				modes: {
					default: ["drag-canvas", "zoom-canvas", "drag-node", "click-select"],
				},
				animate: true,
				layout: {
					type: 'circular',
					center: [500, 300],
				  },
			});
		}

		graph.data(graphData);
		graph.render();

	}, [ref]);

	const handleClick1 = () => {
		graph.updateLayout({
			radius: 200,
			startAngle: Math.PI / 4,
			endAngle: Math.PI,
			divisions: 5,
			ordering: 'degree',
		  });
	  };


	const handleClick2 = () => {
		
		graph.updateLayout({
			type: 'grid',
			rows: 2,
			cols: 2,
			preventOverlap: true,
			preventOverlapPdding: 10,
		});

	  };

	return (
		<>
			<button onClick={handleClick1}>changeData1</button>
			<button onClick={handleClick2}>changeData2</button>
			<div ref={ref}> </div>
		</>
		);
	};

	export default G6GraphTest;
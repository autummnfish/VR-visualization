import { OrbitControls } from "@react-three/drei";
import graph from "./graph.json";
import Line from "./components/line";
import Node from "./components/node";
import { VRCanvas, DefaultXRControllers } from "@react-three/xr";
import "./style.css";

function App() {
	const { links, nodes } = graph;
	const radius = 10;
	const points = getCartesianPoints(radius, nodes);
	return (
		<div style={{ width: window.innerWidth, height: window.innerHeight }}>
			<VRCanvas alpha={true}>
				<pointLight color="white" position={[0, 0, 0]} intensity={1} />
				<OrbitControls
					enablePan={false}
					enableZoom={false}
					enableRotate={true}
				/>
				<DefaultXRControllers />
				{points.map((point, index) => {
					return <Node point={point} key={`node is ${index + 1}`} />;
				})}
				{links.map((link, index) => {
					const source = points[link.source];
					const target = points[link.target];
					return (
						<Line
							source={source}
							target={target}
							segment={2}
							key={`link is ${index + 1}`}
						/>
					);
				})}
			</VRCanvas>
		</div>
	);
}

const getCartesianPoints = (radius, nodes) => {
	const cartesian = [];
	nodes.forEach((node) => {
		cartesian.push(convertPolar2Cartesian(radius, node));
	});
	return cartesian;
};

const convertPolar2Cartesian = (radius, node) => {
	return {
		x: radius * Math.sin(node.y) * Math.cos(node.x),
		y: radius * Math.sin(node.y) * Math.sin(node.x),
		z: radius * Math.cos(node.y),
	};
};

export default App;

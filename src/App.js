import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import graph from "./graph.json";
import Line from "./components/line";
import "./style.css";

function App() {
	const { links } = graph;
	const radius = 10;
	const points = convertPolar2Cartesian(radius);
	return (
		<div style={{ width: window.innerWidth, height: window.innerHeight }}>
			<Canvas>
				<pointLight color="white" position={[0,0,0]} />
				<OrbitControls
					enablePan={false}
					enableZoom={false}
					enableRotate={true}
				/>
				{points.map((point) => {
					return (
						<mesh position={[point.x, point.y, point.z]}>
							<sphereGeometry args={[0.1]} />
							<meshStandardMaterial />
						</mesh>
					);
				})}
				{links.map((link, index) => {
					const source = [
						points[link.source].x,
						points[link.source].y,
						points[link.source].z,
					];
					const target = [
						points[link.target].x,
						points[link.target].y,
						points[link.target].z,
					];
					return <Line start={source} end={target} index={index} />;
				})}
			</Canvas>
		</div>
	);
}


const convertPolar2Cartesian = (radius) => {
	const { nodes } = graph;
	const cartesian = [];
	nodes.forEach((node) => {
		cartesian.push({
			x: radius * Math.sin(node.y) * Math.cos(node.x),
			y: radius * Math.sin(node.y) * Math.sin(node.x),
			z: radius * Math.cos(node.y),
		});
	});
	return cartesian;
};

export default App;

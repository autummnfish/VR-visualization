import { useRef, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import graph from "./graph.json";

function Line({ start, end }) {
	const ref = useRef();
	useLayoutEffect(() => {
		ref.current.geometry.setFromPoints(
			createOrbitPoints(start, end, 1000),
		);
	}, [start, end]);
	return (
		<line ref={ref}>
			<bufferGeometry />
			<lineBasicMaterial color="hotpink" />
		</line>
	);
}

function createOrbitPoints(start, end, segment) {
	const vertices = [];
	const startVec = new THREE.Vector3(...start);
	const endVec = new THREE.Vector3(...end);

	const axis = startVec.clone().cross(endVec);
	axis.normalize();
	const angle = startVec.angleTo(endVec);
	for (let i = 0; i < segment; i++) {
		const q = new THREE.Quaternion();
		q.setFromAxisAngle(axis, (angle / segment) * i);

		const vertex = startVec.clone().applyQuaternion(q);
		vertices.push(vertex);
	}
	vertices.push(endVec);
	return vertices;
}


function App() {
	const { links } = graph;
	const radius = 2.5;
	const points = convertPolar2Cartesian(radius);
	return (
		<div style={{ width: window.innerWidth, height: window.innerHeight }}>
			<Canvas>
				<ambientLight color="red" intensity={0.1} />
				<directionalLight color="red" position={[0, 0, 5]} />
				<OrbitControls
					enablePan={true}
					enableZoom={true}
					enableRotate={true}
				/>
				{points.map((point) => {
					return (
						<mesh position={[point.x, point.y, point.z]}>
							<sphereGeometry args={[0.04]} />
							<meshStandardMaterial />
						</mesh>
					);
				})}
				{links.map((link) => {
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
					return <Line start={source} end={target} />;
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
			y: radius * Math.sin(node.x) * Math.cos(node.y),
			z: radius * Math.cos(node.y),
		});
	});
	return cartesian;
};

export default App;

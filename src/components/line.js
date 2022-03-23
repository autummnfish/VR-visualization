import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";

function Line({ source, target, segment }) {
	const ref = useRef();
	const start = [source.x, source.y, source.z];
	const end = [target.x, target.y, target.z];
	useLayoutEffect(() => {
		ref.current.geometry.setFromPoints(
			createOrbitPoints(start, end, segment),
		);
	}, [start, end]);
	return (
		<line ref={ref}>
			<bufferGeometry />
			<lineBasicMaterial color="blue" />
		</line>
	);
}

const createOrbitPoints = (start, end, segment) => {
	const vertices = [];
	const startVec = new THREE.Vector3(...start);
	const endVec = new THREE.Vector3(...end);
	const axis = startVec.clone().cross(endVec);
	axis.normalize();
	const angle = startVec.angleTo(endVec);
	for (let i = 0; i < segment; i++) {
		const quaternion = new THREE.Quaternion();
		quaternion.setFromAxisAngle(axis, (angle / segment) * i);
		const vertex = startVec.clone().applyQuaternion(quaternion);
		vertices.push(vertex);
	}
	vertices.push(endVec);
	return vertices;
};

export default Line;

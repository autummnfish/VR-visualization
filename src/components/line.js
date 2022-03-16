import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";

function Line({ start, end }) {
	const ref = useRef();
	useLayoutEffect(() => {
		ref.current.geometry.setFromPoints(createOrbitPoints(start, end, 1000));
	}, [start, end]);
	return (
		<line ref={ref}>
			<bufferGeometry />
			<lineBasicMaterial color="hotpink" />
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
		const q = new THREE.Quaternion();
		q.setFromAxisAngle(axis, (angle / segment) * i);
		const vertex = startVec.clone().applyQuaternion(q);
		vertices.push(vertex);
	}

	vertices.push(endVec);
	return vertices;
}

export default Line;

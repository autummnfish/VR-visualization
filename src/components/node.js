import { useState } from "react";
import { Interactive } from "@react-three/xr";

function Node({ point }) {
	const [select, setSelect] = useState(false);
	const [squeeze, setSqueeze] = useState(false);
	return (
		<Interactive
			onSelect={() => setSelect(!select)}
			onSqueezeStart={() => {
				setSqueeze(true);
			}}
			onSqueezeEnd={() => {
				setSqueeze(false);
			}}
		>
			<mesh position={[point.x, point.y, point.z]}>
				<sphereGeometry args={squeeze ? [1] : [0.5]} />
				<meshStandardMaterial
					color={select ? (squeeze ? "red" : "blue") : "white"}
				/>
			</mesh>
		</Interactive>
	);
}

export default Node;

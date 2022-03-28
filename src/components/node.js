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
				<sphereGeometry args={squeeze ? [0.5] : [0.3]} />
				<meshStandardMaterial
					color={select ? (squeeze ? "red" : "blue") : "white"}
				/>
			</mesh>
		</Interactive>
	);
}

export default Node;

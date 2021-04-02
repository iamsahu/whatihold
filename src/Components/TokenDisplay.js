import React from "react";

function TokenDisplay(props) {
	
	return (
		<div className="w-full">
			<div className="font-serif font-thin text-xl w-full pb-8 border px-4 pt-4 shadow-xl rounded-lg bw">
				<br />
				{props}
			</div>
		</div>
	);
}

export default TokenDisplay;

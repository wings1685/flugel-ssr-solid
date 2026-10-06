import { Loading } from "solid-js";
import { Router } from "@/router";
import "@/_global/styles/global.sass";

export default function App() {
	return (
		<Router>
			{(props) => (
				<Loading>{ props.children }</Loading>
			)}
		</Router>
	);
}

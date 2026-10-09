import { Loading } from "solid-js";
import { Router } from "@/router";
import "@/_global/styles/global.sass";
import Header from "./_parts/Header";

export default function App() {
	return (
		<Router>
			{(props) => (
				<main>
					<Header />
					<Loading>{ props.children }</Loading>
				</main>
			)}
		</Router>
	);
}

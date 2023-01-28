import { FunctionComponent, PropsWithChildren, useEffect, useState } from "react";

type Props = any

const LoadingScreen: FunctionComponent<PropsWithChildren> = ({children}) => {
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 3200)
	}, [])
	if (loading) {
		return (
			<div>
				<h1>Welcome to the Panama Canal</h1>
				<h2>GAME</h2>
				<p>Loading...</p>
			</div>
		)
	}
	return (
		<div>
			{children}
		</div>
	)
}

export default LoadingScreen

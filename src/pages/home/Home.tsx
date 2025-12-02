function Home() {
	return (
		<div className="flex justify-center items-center w-full min-h-[calc(100vh-9rem)] md:h-[calc(100vh-9rem)]">
			<div className="container grid grid-cols-1 gap-8 px-4 text-emerald-400 md:grid-cols-2 md:gap-0">
				<div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
					<h2 className="text-3xl font-bold md:text-5xl">
						Seja bem vinde!
					</h2>
					<p className="text-base md:text-xl">
						Aqui você encontra os melhores medicamentos e cosméticos!
					</p>

					<div className="flex justify-around gap-4">
						<div className="px-4 py-2 text-emerald-400 border-2 border-emerald-400 border-solid rounded">
							Novo Produto
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center">
					<img
						src="https://ik.imagekit.io/hnkqnvn7cu/VivaBem.jpeg"
						alt="Image da farmácia"
						className="w-full max-w-xs md:max-w-md lg:max-w-lg rounded-md"
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
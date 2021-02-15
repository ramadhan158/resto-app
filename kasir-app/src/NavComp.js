import React from 'react';

const NavComp = ({kategoris, gantiKategori, kategoriAktif}) => {
	return(
		<div className="container-nav">
			<div>
				{kategoris && kategoris.map(kategori => {
					return(
						<button
							key={kategori.id}
							onClick={() => {gantiKategori(kategori.nama)}}
							className={kategori.nama === kategoriAktif ? "aktif" : undefined}
							>{kategori.nama}
						</button>
					)
				})}
			</div>
			<h1 className="kategori">Kategori Pesanan</h1>
		</div>
	)
}

export default NavComp;
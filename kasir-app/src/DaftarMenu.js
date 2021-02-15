import React, { useState, useEffect } from 'react';
import CardDaftarMenu from './CardDaftarMenu';
import axios from 'axios'

const DaftarMenu = ({kategoriAktif, tambahKeranjang}) => {

	const [kategoriMenu, setKategoriMenu] = useState();

	useEffect(() => {
		axios
			.get("http://localhost:3004/products?category.nama=" + kategoriAktif)
			.then((response) => {
				// handle success
				setKategoriMenu(response.data)
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});
	}, [kategoriAktif])

	return(
		<div className="container-cards">
			{kategoriMenu && kategoriMenu.map(kategori => {
				return(
					<div key={kategori.id} onClick={() => {tambahKeranjang(kategori)}}>
						<CardDaftarMenu
							onClick={() => {tambahKeranjang()}}
							gambar={kategori.gambar}
							harga={kategori.harga}
							kode={kategori.kode}
							nama={kategori.nama}
							kategoriAktif={kategoriAktif}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default DaftarMenu;
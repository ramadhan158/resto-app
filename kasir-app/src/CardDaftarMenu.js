import React from 'react';

const CardDaftarMenu = ({gambar, harga, kode, nama, kategoriAktif}) => {

	return(
		<>
			<img src={"asset/" + kategoriAktif.toLowerCase() + "/" + gambar} alt=""/>
			<h2>{nama}<span>{kode}</span></h2>
			<h2>Rp {new Intl.NumberFormat("de-DE").format(harga)}</h2>
		</>
	)
}

export default CardDaftarMenu;
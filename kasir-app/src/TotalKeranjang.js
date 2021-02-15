import React from 'react';

const TotalKeranjang = ({totalBelanja, buatPesanan}) => {

	if (totalBelanja !== 0) {
		return (
			<div className="total-keranjang">
				<h1>Total Pesanan: Rp {new Intl.NumberFormat("de-DE").format(totalBelanja)}</h1>
				<button onClick={buatPesanan}>Buat Pesanan</button>
			</div>
		)
	} else {
		return(
			<div className="total-keranjang">
				<h1>Anda Belum Memesan</h1>
			</div>
		)
	}
};

export default TotalKeranjang;
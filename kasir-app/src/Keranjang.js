import React, { useState } from 'react';
import ModalKeranjang from './ModalKeranjang';

const Keranjang = ({keranjangPost, tambahPesanan, kurangPesanan, hapusKeranjang}) => {

	const [ keranjangDetail, setKeranjangDetail ] = useState();
	const [showModal, setShowModal] = useState(false);

	const makeDetail = (keranjangs) => {
		setKeranjangDetail(keranjangs);
		handleClose()
	}

	const handleClose = () => {
		setShowModal(!showModal);
	}

	return (
		<div className="container-keranjang">
			{keranjangPost && keranjangPost.map(keranjangs => {
				return(
					<div className="keranjang" key={keranjangs.product.id}>
						<span className="keranjang-top">
							<span className="tambah-kurang">
								<span onClick={() => {kurangPesanan(keranjangs)}}>-</span>
								<h2>{keranjangs.jumlah}</h2>
								<span onClick={() => {tambahPesanan(keranjangs)}}>+</span>
							</span>
							<span className="nama-harga">
								<h3>{keranjangs.product.nama}</h3>
								<h3>Rp {new Intl.NumberFormat("de-DE").format(keranjangs.product.harga)}</h3>
							</span>
						</span>
						<span className="keranjang-bottom">
							<h2>Rp {new Intl.NumberFormat("de-DE").format(keranjangs.total_harga)}</h2>
							<div>
								<button onClick={() => {hapusKeranjang(keranjangs)}}>Hapus</button>
								<button onClick={() => {makeDetail(keranjangs)}}>Detail</button>
							</div>
						</span>
					</div>
				)
			})}
		<ModalKeranjang keranjangDetail={keranjangDetail} handleClose={handleClose} showModal={showModal}/>
		</div>
	)
};

export default Keranjang;
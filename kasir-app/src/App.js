import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from "sweetalert";
import NavComp from "./NavComp";
import DaftarMenu from "./DaftarMenu";
import Keranjang from "./Keranjang";
import TotalKeranjang from './TotalKeranjang';

const App = () => {
	// changing categories
	const [kategoriAktif, setKategoriAktif] = useState("Makanan");
	const [kategoris, setKategoris] = useState();

	// handling keranjang
	const [keranjangPost, setKeranjangPost] = useState();
	const [totalBelanja, setTotalBelanja] = useState();

	// query kategori
	useEffect(() => {
		axios
			.get("http://localhost:3004/categories")
			.then((response) => {
				// handle success
				setKategoris(response.data)
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});
			getKeranjang()
	}, []);

	const gantiKategori = (kategori) => {
		setKategoriAktif(kategori)
	}

	const getKeranjang = () => {
		axios
			.get("http://localhost:3004/keranjangs")
			.then((response) => {
				setKeranjangPost(response.data)
				hitungTotalKeranjang(response.data)
			})
			.catch((error) => {
				console.log(error);
			});	
	}

	const hitungTotalKeranjang = (keranjangs) => {
		const totalBayar = keranjangs.reduce((result, item) => {
			return result + item.total_harga;
		}, 0);
		setTotalBelanja(totalBayar)
	}

	const tambahKeranjang = (kategori) => {
		axios
			.get("http://localhost:3004/keranjangs?product.id=" + kategori.id)
			.then((response) => {
				if(response.data.length) {
					const keranjang = {
						jumlah: response.data[0].jumlah+1,
						total_harga: response.data[0].total_harga + kategori.harga,
						product: response.data[0].product
					};

					axios
						.put("http://localhost:3004/keranjangs/" +response.data[0].id, keranjang)
						.then((response) => {
							getKeranjang()
							swal({
								title: `${kategori.nama}`,
								text: "Berhasil Tambah 1 Pesanan",
								icon: "success",
								button: false,
								timer: 1000,
							});
						})
						.catch((error) => {
							console.log(error);
						});
				} else {
					const keranjang = {
						jumlah: 1,
						total_harga: kategori.harga,
						product: kategori
					};
					
					axios
						.post("http://localhost:3004/keranjangs", keranjang)
						.then((response) => {
							getKeranjang()
							swal({
								title: "Berhasil!",
								text: "Pesanan Berhasil Masuk Keranjang",
								icon: "success",
								button: false,
								timer: 1000,
							});
						})
						.catch((error) => {
							// handle error
							console.log(error);
						});
				}
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});
	}

	const tambahPesanan = (keranjangs) => {
		const keranjang = {
			jumlah: keranjangs.jumlah+1,
			total_harga: keranjangs.total_harga + keranjangs.product.harga,
			product: keranjangs.product
		};

		axios
			.put("http://localhost:3004/keranjangs/" +keranjangs.id, keranjang)
			.then((response) => {
				getKeranjang()
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const kurangPesanan = (keranjangs) => {
		if (keranjangs.jumlah > 1) {
			const keranjang = {
				jumlah: keranjangs.jumlah-1,
				total_harga: keranjangs.total_harga - keranjangs.product.harga,
				product: keranjangs.product
			};

			axios
				.put("http://localhost:3004/keranjangs/" +keranjangs.id, keranjang)
				.then((response) => {
					getKeranjang()
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	const hapusKeranjang = (keranjangs) => {
		axios
			.delete("http://localhost:3004/keranjangs/" + keranjangs.id)
			.then((response) => {
				getKeranjang()
				swal({
				title: `${keranjangs.product.nama} Dihapus`,
				text: " ",
				icon: "error",
				button: false,
				timer: 1500,
			});
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});
	}

	const buatPesanan = () => {

		const keranjang = {
		    "total_bayar": totalBelanja,
		    "menus": keranjangPost
		 }

		axios
			.post("http://localhost:3004/pesanans", keranjang)
			.then((response) => {
				swal({
					title: "Berhasil Memesan!",
					text: "Mohon Tunggu Pesanan Anda",
					icon: "success",
					button: false,
					timer: 1000,
				});
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});

		axios
			.get("http://localhost:3004/keranjangs")
			.then((response) => {
				const keranjangs = response.data
				keranjangs.map(item => {
					axios
						.delete("http://localhost:3004/keranjangs/" + item.id)
						.then((response) => {
							setKeranjangPost(undefined)
						})
						.catch((error) => {
							// handle error
							console.log(error);
						});
				})
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});

	}

	return (
		<React.Fragment>
			<NavComp
				kategoris={kategoris}
				gantiKategori={gantiKategori}
				kategoriAktif={kategoriAktif}
			/>
			<div className="container-menu">
				<DaftarMenu kategoriAktif={kategoriAktif} tambahKeranjang={tambahKeranjang}/>
				<Keranjang
					keranjangPost={keranjangPost}
					tambahPesanan={tambahPesanan}
					kurangPesanan={kurangPesanan}
					hapusKeranjang={hapusKeranjang}
				/>
			</div>
			<TotalKeranjang
				totalBelanja={totalBelanja}
				buatPesanan={buatPesanan}
			/>
		</React.Fragment>
	)
};

export default App;
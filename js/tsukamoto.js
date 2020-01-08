$(function(){
	$('#proses').click(function(){
		var ipk = $('#ipk').val();
		var pendapatan = $('#pendapatan').val();
		var alfa = new Array(18);
		var z = new Array(18);
		var syarat = 0;

		$('input:checked').each(function(){
    		syarat +=  parseFloat($(this).val());
		});

		syarat = syarat;	

    	$('#hasil').val(prediksirekomendasi()+"%");	
   

    	//untuk menampilkan tabel alfa dan z setiap aturan
    	var z_result = "";
		for(i = 0; i < z.length; i++){
			z_result += "<tr><td>"+(i+1)+"</td><td>alfa</td><td>"+alfa[i]+"</td><td>z</td><td>"+z[i] + "</td><tr/>";
		}
		$('#z-result').html(z_result);
	
	/**
	*  mencari nilai minimum dari tiga variable
	*  @param x
	*  @param y
	*  @param z
	*  @return nilai minimum
	*/
	function findMin(x, y, z){
		if(x <= y && x <= z){
			return x;
		}else if(y <= x && y <= z){
			return y;
		}else{
			return z;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan syarat Kurang
	*  @return nilai keanggotaan di himpunan syarat Kurang
	*/
	function syaratKurang(){
		if(syarat <= 20){
			return 1;
		}else if(syarat > 20 && syarat < 70){
			return (70 - syarat) / 50;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan syarat lengkap
	*  @return nilai keanggotaan di himpunan syarat lengkap
	*/
	function syaratLengkap(){
		if(syarat >= 70){
			return 1;
		}else if(syarat > 20 && syarat < 70){
			return (syarat - 20) / 50;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan ipk Rendah
	*  @return nilai keanggotaan di himpunan ipk Rendah
	*/
	function ipkRendah(){
		if(ipk <= 200){
			return 1;
		}else if(ipk > 200 && ipk < 250){
			return (250 - ipk) / 50;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan ipk sedang
	*  @return nilai keanggotaan di himpunan ipk sedang
	*/
	function ipkSedang(){
		if(ipk >= 250 && ipk <= 300){
			return 1;
		}else if(ipk > 200 && ipk < 250){
			return (ipk - 200) / 50;
		}else if(ipk > 300 && ipk < 350){
			return (350 - ipk) / 50;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan ipk Tinggi
	*  @return nilai keanggotaan di himpunan ipk Tinggi
	*/
	function ipkTinggi(){
		if(ipk >= 350){
			return 1;
		}else if(ipk > 300 && ipk < 350){
			return (ipk - 300) / 50;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan pendapatan Kurang
	*  @return nilai keanggotaan di himpunan pendapatan Kurang
	*/
	function pendapatanKurang(){
		if(pendapatan <= 1){
			return 1;
		}else if(pendapatan > 1 && pendapatan < 3){
			return (3 - pendapatan) / 2;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan pendapatan sedang
	*  @return nilai keanggotaan di himpunan pendapatan sedang
	*/
	function pendapatanSedang(){
		if(pendapatan >= 3 && pendapatan <= 7){
			return 1;
		}else if(pendapatan > 1 && pendapatan < 3){
			return (pendapatan - 1) / 2;
		}else if(pendapatan > 7 && pendapatan < 9){
			return (9 - pendapatan) / 2;
		}else{
			return 0;
		}
	}


	/**
	*  mencari nilai keanggotaan himpunan pendapatan Mampu
	*  @return nilai keanggotaan di himpunan pendapatan Mampu
	*/
	function pendapatanMampu(){
		if(pendapatan >= 9){
			return 1;
		}else if(pendapatan > 7 && pendapatan < 9){
			return (pendapatan - 7) / 2;
		}else{
			return 0;
		}
	}


	/**
	*  mencari rekomendasi di himpunan tidak
	*  @param alfa
	*  @return rekomendasi
	*/
	function tidakRekomendasi(alfa){
		if(alfa > 0 && alfa < 1){
			return (80 - (alfa * 40));
		}else if(alfa == 1){
			return 40;
		}else{
			return 80;
		}
	}

	/**
	*  mencari rekomendasi di himpunan rekomendasi
	*  @param alfa
	*  @return rekomendasi
	*/
	function Rekomendasi(alfa){
		if(alfa > 0 && alfa < 1){
			return (40 + (alfa * 40));
		}else if(alfa == 1){
			return 80;
		}else{
			return 40;
		}
	}
	
	/**
	*  mencari nilai z untuk semua aturan yang ada
	*/
	function aturan(){
		//1. Jika syarat Kurang dan pendapatan Kurang dan ipk Rendah maka tidak rekomendasi
		alfa[0]	= findMin(syaratKurang(),pendapatanKurang(),ipkRendah());
		z[0] = tidakRekomendasi(alfa[0]);
		//2. Jika syarat Kurang dan pendapatan Kurang dan ipk SEDANG maka tidak rekomendasi
		alfa[1]	= findMin(syaratKurang(),pendapatanKurang(),ipkSedang());
		z[1] = tidakRekomendasi(alfa[1]);
		//3. Jika syarat Kurang dan pendapatan Kurang dan ipk Tinggi maka tidak rekomendasi
		alfa[2]	= findMin(syaratKurang(),pendapatanKurang(),ipkTinggi());
		z[2] = tidakRekomendasi(alfa[2]);
		//4. Jika syarat Kurang dan pendapatan SEDANG dan ipk Rendah maka tidak rekomendasi
		alfa[3]	= findMin(syaratKurang(),pendapatanSedang(),ipkRendah());
		z[3] = tidakRekomendasi(alfa[3]);
		//5. Jika syarat Kurang dan pendapatan SEDANG dan ipk SEDANG maka tidak rekomendasi
		alfa[4]	= findMin(syaratKurang(),pendapatanSedang(),ipkSedang());
		z[4] = tidakRekomendasi(alfa[4]);
		//6. Jika syarat Kurang dan pendapatan SEDANG dan ipk Tinggi maka tidak rekomendasi
		alfa[5]	= findMin(syaratKurang(),pendapatanSedang(),ipkTinggi());
		z[5] = tidakRekomendasi(alfa[5]);
		//7. Jika syarat Kurang dan pendapatan Mampu dan ipk Rendah maka tidak rekomendasi
		alfa[6]	= findMin(syaratKurang(),pendapatanMampu(),ipkRendah());
		z[6] = tidakRekomendasi(alfa[6]);
		//8. Jika syarat Kurang dan pendapatan Mampu dan ipk SEDANG maka tidak rekomendasi
		alfa[7]	= findMin(syaratKurang(),pendapatanMampu(),ipkSedang());
		z[7] = tidakRekomendasi(alfa[7]);
		//9. Jika syarat Kurang dan pendapatan Mampu dan ipk Tinggi maka tidak rekomendasi
		alfa[8]	= findMin(syaratKurang(),pendapatanMampu(),ipkTinggi());
		z[8] = tidakRekomendasi(alfa[8]);
		//10. Jika syarat LENGKAP dan pendapatan Kurang dan ipk Rendah maka tidak rekomendasi
		alfa[9] = findMin(syaratLengkap(),pendapatanKurang(),ipkRendah());
		z[9] = tidakRekomendasi(alfa[9]);
		//11. Jika syarat LENGKAP dan pendapatan Kurang dan ipk SEDANG maka rekomendasi 
		alfa[10] = findMin(syaratLengkap(),pendapatanKurang(),ipkSedang());
		z[10] = Rekomendasi(alfa[10]);
		//12. Jika syarat LENGKAP dan pendapatan Kurang dan ipk Tinggi maka rekomendasi 
		alfa[11] = findMin(syaratLengkap(),pendapatanKurang(),ipkTinggi());
		z[11] = Rekomendasi(alfa[11]);
		//13. Jika syarat LENGKAP dan pendapatan SEDANG dan ipk Rendah maka tidak rekomendasi
		alfa[12] = findMin(syaratLengkap(),pendapatanSedang(),ipkRendah());
		z[12] = tidakRekomendasi(alfa[12]);
		//14. Jika syarat LENGKAP dan pendapatan SEDANG dan ipk SEDANG maka rekomendasi
		alfa[13] = findMin(syaratLengkap(),pendapatanSedang(),ipkSedang());
		z[13] = Rekomendasi(alfa[13]);
		//15. Jika syarat LENGKAP dan pendapatan SEDANG dan ipk Tinggi maka rekomendasi
		alfa[14] = findMin(syaratLengkap(),pendapatanSedang(),ipkTinggi());
		z[14] = Rekomendasi(alfa[14]);
		//16. Jika syarat LENGKAP dan pendapatan Mampu dan ipk Rendah maka tidak rekomendasi
		alfa[15] = findMin(syaratLengkap(),pendapatanMampu(),ipkRendah());
		z[15] = tidakRekomendasi(alfa[15]);
		//17. Jika syarat LENGKAP dan pendapatan Mampu dan ipk SEDANG maka tidak rekomendasi
		alfa[16] = findMin(syaratLengkap(),pendapatanMampu(),ipkSedang());
		z[16] = tidakRekomendasi(alfa[16]);
		//18. Jika syarat LENGKAP dan pendapatan Mampu dan ipk Tinggi maka rekomendasi
		alfa[17] = findMin(syaratLengkap(),pendapatanMampu(),ipkTinggi());
		z[17] = Rekomendasi(alfa[17]);
	}
	
	/**
	*  mencari nilai total z(defuzzyfikasi)
	*  @return nilai total z
	*/
	function defuzzyfikasi(){
		var temp1 = 0;
		var temp2 = 0;
		var hasil = 0;

		for(i = 0; i < 18; i++){
			temp1 = temp1 + alfa[i] * z[i];
			temp2 = temp2 + alfa[i];
		}

		hasil = temp1 / temp2;
		return Math.round(hasil);
	}
	
	/**
	*  menghitung semua aturan dan menentukan rekomendasi
	*  @return rekomendasi
	*/
	function prediksirekomendasi(){
		aturan();
		return defuzzyfikasi();
	}

	});
});
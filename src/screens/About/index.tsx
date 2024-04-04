import React from 'react';
import {Dimensions, Linking} from 'react-native';
import {ScrollView} from 'react-native';
import {Button, Image, Text, View} from 'react-native-ui-lib';

const About = () => {
  const handleContactUs = () => {
    Linking.openURL('https://bukaka.com');
  };

  return (
    <ScrollView>
      <Image
        source={require('./img/hero.jpg')}
        style={{
          height: 200,
          objectFit: 'cover',
          width: Dimensions.get('window').width,
        }}
      />
      <View padding-16>
        <Text text40M>Tentang Bukaka</Text>
        <Text selectable>
          {'\n'}
          PT Bukaka Teknik Utama Tbk, atau selanjutnya disebut 'Bukaka' atau
          'Perseroan', didirikan pada tanggal 25 Oktober 1978 berdasarkan Akta
          Notaris Haji Bebasa Daeng Lalo, SH, No. 149 dan telah mendapat
          persetujuan dari Menteri Kehakiman RI melalui Surat Keputusan No.
          Y.A.5/242/7 tanggal 21 Mei 1979.
          {'\n'}
          {'\n'}
          Anggaran Dasar Perseroan telah mengalami beberapa kali perubahan
          dimana perubahan terakhir di tahun 2011 adalah sehubungan dengan
          penurunan modal dasar, modal ditempatkan dan disetor penuh serta nilai
          nominal saham. Modal Dasar yang sebelumnya Rp2.000.000.000.000
          diturunkan menjadi Rp1.352.000.000.000, terbagi atas 4.000.000.000
          saham. Modal ditempatkan dan disetor diturunkan dari sebelumnya
          sebesar Rp1.320.226.000.000 menjadi Rp892.472.776.000. Penurunan modal
          disetor dilakukan melalui kuasi reorganisasi dengan cara menurunkan
          nilai nominal saham dari sebelumnya Rp500 menjadi Rp338 per saham.
          Perubahan ini telah diaktakan dengan Akta No. 20 tanggal 15 Desember
          2011 oleh Notaris H. Fedris S.H., dan telah mendapat persetujuan
          Menteri Hukum dan Hak Asasi Manusia Republik Indonesia berdasarkan
          Surat Keputusan No. AHU-08119.AH.01.02 tanggal 16 Februari 2012.
          {'\n'}
          {'\n'}
          Membangun usaha dari sebuah perusahaan berskala kecil yang menangani
          bidang usaha perbengkelan kendaraan bermotor, bisnis Perseroan terus
          berevolusi sehingga kini memposisikannya sebagai salah satu perusahaan
          terkemuka di bidang Engineering, Procurement and Construction.
          {'\n'}
          {'\n'}
          Dengan dukungan sumber daya manusia yang ahli di bidangnya, Perseroan
          turut berkontribusi terhadap percepatan pembangunan nasional melalui
          penyediaan produk dan layanan yang berkualitas terhadap sektor-sektor
          strategis, seperti energi, transportasi dan komunikasi. Perseroan juga
          didukung oleh entitas anak usahanya, PT Bukaka Mandiri Sejahtera yang
          bergerak di bidang pertambangan, pengolahan dan perdagangan nikel
          serta PT Bukaka Energi yang bergerak di bidang pembangkit tenaga
          listrik.
          {'\n'}
          {'\n'}
          Dengan dukungan sumber daya manusia yang ahli di bidangnya, Perseroan
          turut berkontribusi terhadap percepatan pembangunan nasional melalui
          penyediaan produk dan layanan yang berkualitas terhadap sektor-sektor
          strategis, seperti energi, transportasi dan komunikasi. Perseroan juga
          didukung oleh entitas anak usahanya, PT Bukaka Mandiri Sejahtera (BMS)
          yang bergerak di bidang pertambangan, pengolahan dan perdagangan nikel
          serta PT Bukaka Energi (BE) yang bergerak di bidang pembangkit tenaga
          listrik.
          {'\n'}
          {'\n'}
          Komitmen Perseroan untuk mempersembahkan karya terbaiknya bagi bangsa
          melalui kemitraan strategis dengan banyak perusahaan terkemuka,
          termasuk dari mancanegara, membuahkan Sertifikasi ISO 9001 dan
          Sertifikasi dari American Petroleum Institute (API) untuk kegiatan
          jasa terkait minyak dan gas bumi tahun 1995
        </Text>

        <Button onPress={handleContactUs} marginT-12 label="Hubungi Kami" />
      </View>
    </ScrollView>
  );
};

export default About;

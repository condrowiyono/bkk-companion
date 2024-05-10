import React from 'react';
import {ScrollView} from 'react-native';
import {Card, Carousel, Image, Text, View} from 'react-native-ui-lib';

const IMAGES = [
  'https://www.bukaka.com/asset/uploads/images/BRB_two_tunnel_glass.JPG',
  'https://www.bukaka.com/asset/uploads/images/BRB_Port.jpg',
  'https://www.bukaka.com/asset/uploads/images/Twr_transmisi.png',
];

const BUSSINESS = [
  {
    name: 'Steel Tower',
    desc: 'Sebagai pionir dalam membuat dan membangun transmisi tegangan tinggi dan sangat tinggi di Indonesia, Perseroan memproduksi transmisi pertamanya dengan kapasitas 70kV dan 150 kV pada tahun 1981, dan double circuit tower dengan kapasitas 500 kV pada tahun 1984. Hingga tahun 2010, Perseroan telah menyelesaikan sejumlah proyek turn-key dengan kapasitas antara 70kV s/d 500 kV untuk PT Perusahaan Listrik Negara (Persero). Di samping itu, Perseroan merupakan satu-satunya perusahaan di Asia Tenggara yang memiliki fasilitas uji coba tower berkapasitas hingga 500 kV.  Perseroan juga berkontribusi dalam proyek turn-key tower telekomunikasi dan pembangunan shelter untuk memenuhi kebutuhan beberapa operator dan provider telco di Indonesia, baik untuk tipe tower curve dan pipe, serta pembangunan proyek turn-key untuk tower broadcast dengan ketinggian 220 m di Surabaya dan Semarang. Unit Usaha ini telah melayani permintaan dari beberapa perusahaan besar seperti PT SMART, PT Telkom Indonesia Tbk (Persero), Siemens, PT XL Axiata, PT Indosat Tbk, PT Tower Bersama, PT Daya Mitra, dan PT Protelindo.',
  },
  {
    name: 'Passenger Boarding Bridge',
    desc: 'Untuk memenuhi standar industri aviasi yang ditetapkan oleh konsultan internasional dan para otoritas bandara, sejak tahun 1989 Perseroan telah memproduksi jembatan penumpang menggunakan komponen-komponen dan material kualitas terbaik yang diproduksi oleh para insinyur yang terampil di pabrik jembatan penumpang. Perseroan memproduksi dua tipe jembatan penumpang, yaitu yang dinding-nya terbuat dari baja dan kaca. Semua produk dibuat menggunakan teknologi mekanik elektro dan sistem pengendalian modern yang dapat disesuaikan untuk memenuhi tingkat kenyamanan dan keamanan bagi para penumpang dan pesawat. Menggunakan konsep modern, Unit Usaha Jembatan Penumpang Perseroan menawarkan produk yang mudah dioperasikan dan perawatannya. Sepanjang tahun 2013, Perseroan telah memproduksi sebanyak 566 unit, dimana 402 unit diantaranya dipesan oleh beberapa negara yaitu Jepang, Thailand, Hong Kong, Cina, India, Malaysia, Chile, Bangladesh, Myanmar, Brunei, dan Singapura.',
  },
  {
    name: 'Steel Bridge',
    desc: 'Didirikan pada tahun 1996, unit usaha ini terkemuka dalam Engineering, Procurement, Fabrication, Finishing, Construction, Installation, dan Service. Pada awal tahun beroperasi, unit usaha ini menerima pemesanan pembuatan jembatan baja dengan ukuran panjang 30.740 meter, dan berhasil menjadi pionir dalam konstruksi truss bridge di Indonesia. Beberapa tahun kemudian, Perseroan secara persisten masuk kedalam market dan memposisikan perusahaan sebagai 4 besar produsen jembatan baja di Indonesia dalam waktu kurang dari lima tahun. Upaya yang persisten tersebut sejalan dengan pembuatan design jembatan terbaik dan produksi arch bridge di Kahayan, Kalimantan Tengah, pada tahun 2003.  Dengan komitmen yang kuat dalam peningkatan teknologi dan efisiensi dalam produk dan sistem, Perseroan telah memproduksi dan memasang banyak jembatan arch hampir di setiap wilayah Indonesia seperti Jembatan Pela dan Mahulu di Kalimantan Timur, Jembatan Kalahien dan Kahayan di Kalimantan Tengah, Jembatan Siak Tiga, Teluk Masjid dan Siak Empat di Pekanbaru, Riau. Beberapa pelanggan diantaranya adalah PT Hutama Karya (Persero), PT Waskita Karya Tbk (Persero), PT Adhi Karya Tbk (Persero), PT Pembangunan Perumahan Tbk (Persero), dan Departemen Pekerjaan Umum (PU).',
  },
  {
    name: 'Oil & Gas Equipment',
    desc: 'Bukaka Oil & Gas Equipment and Plant System business unit is a profesional company in Manufacturing  and Engineering, Procurement  and Construction Project.  With strong capability to undertake the project of complete equipment  and the general contract project.  We has participated in the construction of great number of major projects. Product manufacturing in Oil and Gas Equipment are Pumping unit, Gear Reducer,  Mud Tank, and Gas Separator. Bukaka is capable offering complete design, engineering, manufacturing, erection and commissioning  for general contract project such as : Material handling  ( Belt conveyor, stacking conveyor, Ship un-loader conveyor, Fixed Crane , Fly ash system, Gantry crane), Cement Plant, Power Plant, Processing Equipment & Steel Structure. Our business unit supported by 25 engineers and more than 200 employees in the production line with skills and experiences.  With  facilities workshop, machines and equipments to executed projects.',
  },
  {
    name: 'Road Construction Equipment',
    desc: 'Unit yang mulai beroperasi pada tahun 1980 ini, pada awalnya hanya memproduksi Asphalt Sprayer dan Stone Crusher. Kemudian berkembang dengan memproduksi peralatan konstruksi jalan seperti Asphalt Mixing Plant, Asphalt Patch Mixer, Tandem Vibration Roller, Slurry Seal, Asphalt Sprayer, Road Roller dan Stone Crusher, Vibratory Roller, serta Road Maintenance Truck. Dengan kapasitas produksi 50 unit per tahun, unit usaha ini telah melayani beberapa perusahaan yaitu PT Brantas Abipraya, PT Hutama Karya (Persero), PT Adhi Karya Tbk (Persero), PT Nindya Karya, Departemen Pekerjaan Umum (PU), dan beberapa perusahaan swasta lainnya.',
  },
  {
    name: 'Offshore Maintenance And Services',
    desc: 'Sejak beroperasi di tahun 1998, unit usaha ini menyediakan kebutuhan konstruksi dan perawatan di industri minyak dan gas dengan menyiapkan design, konstruksi, fabrikasi, instalasi, dan perawatan.',
  },
  {
    name: 'Special Purpose Vehicle',
    desc: 'Didirikan pada tahun 1978, unit usaha ini adalah pionir dalam pembuatan kendaraan peruntukan khusus (SPV) di Indonesia. Kendaraan yang diproduksi dijamin dengan supervisi yang tinggi terhadap keamanan dan kemudahan mekanisme operasional dan kontrol. Kualitas dari kendaraan yang diproduksi telah memenuhi standar nasional dan internasional, yaitu Regulasi Pemerintah Indonesia No. 11-1979, National Fire Protection Association (NFPA) - USA terutama NFPA 1901 Automotive Fire Apparatus, Japanese Industrial Standard (JSS) Piping, dan ISO 9001:2000 untuk Standard Quality Management System. Beberapa produk kendaraan yang diproduksi diantaranya Fire Fighting Truck, Aerial Telescopic Ladder, Vacuum Road Sweeper, Aerial Platform Articulating, Compactor Truck, Arm Roll Truck, Dump Truck, Water Tank Truck, Vacuum Truck, Fire Jeep, Wrecker Truck, Catering Truck, Stick Boom Crane Truck, and Service & Recondition of Fire Fighting Truck.',
  },
  {
    name: 'Galvanizing',
    desc: 'Unit usaha ini memiliki kapasitas produksi 40.000 ton per tahun dengan ukuran vessel 2,5 m x 1,9 m x 12,6 m. Unit usaha ini telah memperoleh pengakuan internasional dengan diperolehnya Sertifikat ISO 9001:2000 untuk Quality Management dari World Quality Assurance Management, Sertifikat No. 40175 untuk Environmental Management dari United Registrar of Systems (URS) serta Sertifikat No. 40175 untuk Quality Management dari URS.',
  },
];

const Guest = () => {
  return (
    <>
      <View flexG>
        <Text text60M marginH-16 marginV-4>
          Tentang Bukaka
        </Text>
        <Carousel containerStyle={{height: 200}}>
          {IMAGES.map((image, i) => {
            return (
              <View flex centerV key={i}>
                <Image style={{flex: 1}} source={{uri: image}} />
              </View>
            );
          })}
        </Carousel>
      </View>
      <View>
        <Text text60M marginH-16 marginV-4>
          Bisnis Bukaka
        </Text>
        <Carousel containerStyle={{height: 320}} autoplay loop>
          {BUSSINESS.map((item, i) => {
            return (
              <Card flex centerV key={i} marginH-16>
                <Text textAlign="center" text60>
                  {item.name}
                </Text>
                <ScrollView>
                  <Text grey30>{item.desc}</Text>
                </ScrollView>
              </Card>
            );
          })}
        </Carousel>
      </View>
    </>
  );
};

export default Guest;

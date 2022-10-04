const prefectures = [
  { code: '1', name: '北海道', kana_name: { half_upper: 'ﾎﾂｶｲﾄﾞｳ', full_lower: 'ホッカイドウ' }, en_name: { en: 'Hokkaido', ja: 'Hokkaido' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '2', name: '青森県', kana_name: { half_upper: 'ｱｵﾓﾘｹﾝ', full_lower: 'アオモリケン' }, en_name: { en: null, ja: 'Aomori' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '3', name: '岩手県', kana_name: { half_upper: 'ｲﾜﾃｹﾝ', full_lower: 'イワテケン' }, en_name: { en: null, ja: 'Iwate' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '4', name: '宮城県', kana_name: { half_upper: 'ﾐﾔｷﾞｹﾝ', full_lower: 'ミヤギケン' }, en_name: { en: null, ja: 'Miyagi' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '5', name: '秋田県', kana_name: { half_upper: 'ｱｷﾀｹﾝ', full_lower: 'アキタケン' }, en_name: { en: null, ja: 'Akita' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '6', name: '山形県', kana_name: { half_upper: 'ﾔﾏｶﾞﾀｹﾝ', full_lower: 'ヤマガタケン' }, en_name: { en: null, ja: 'Yamagata' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '7', name: '福島県', kana_name: { half_upper: 'ﾌｸｼﾏｹﾝ', full_lower: 'フクシマケン' }, en_name: { en: 'Fukushima', ja: 'Hukusima' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '8', name: '茨城県', kana_name: { half_upper: 'ｲﾊﾞﾗｷｹﾝ', full_lower: 'イバラキケン' }, en_name: { en: null, ja: 'Ibaraki' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '9', name: '栃木県', kana_name: { half_upper: 'ﾄﾁｷﾞｹﾝ', full_lower: 'トチギケン' }, en_name: { en: 'Tochigi', ja: 'Totigi' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '10', name: '群馬県', kana_name: { half_upper: 'ｸﾞﾝﾏｹﾝ', full_lower: 'グンマケン' }, en_name: { en: null, ja: 'Gunma' }, start_date: '1947-05-03', end_date: null, note: '英字表記について、外務省によるパスポートの英字表記はGummaであるが、ISO 3166-2には記載がない。https://www.pref.gunma.jp/04/c3610022.html' },
  { code: '11', name: '埼玉県', kana_name: { half_upper: 'ｻｲﾀﾏｹﾝ', full_lower: 'サイタマケン' }, en_name: { en: null, ja: 'Saitama' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '12', name: '千葉県', kana_name: { half_upper: 'ﾁﾊﾞｹﾝ', full_lower: 'チバケン' }, en_name: { en: 'Chiba', ja: 'Tiba' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '13', name: '東京都', kana_name: { half_upper: 'ﾄｳｷﾖｳﾄ', full_lower: 'トウキョウト' }, en_name: { en: 'Tokyo', ja: 'Tôkyô' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '14', name: '神奈川県', kana_name: { half_upper: 'ｶﾅｶﾞﾜｹﾝ', full_lower: 'カナガワケン' }, en_name: { en: null, ja: 'Kanagawa' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '15', name: '新潟県', kana_name: { half_upper: 'ﾆｲｶﾞﾀｹﾝ', full_lower: 'ニイガタケン' }, en_name: { en: null, ja: 'Niigata' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '16', name: '富山県', kana_name: { half_upper: 'ﾄﾔﾏｹﾝ', full_lower: 'トヤマケン' }, en_name: { en: null, ja: 'Toyama' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '17', name: '石川県', kana_name: { half_upper: 'ｲｼｶﾜｹﾝ', full_lower: 'イシカワケン' }, en_name: { en: 'Ishikawa', ja: 'Isikawa' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '18', name: '福井県', kana_name: { half_upper: 'ﾌｸｲｹﾝ', full_lower: 'フクイケン' }, en_name: { en: 'Fukui', ja: 'Hukui' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '19', name: '山梨県', kana_name: { half_upper: 'ﾔﾏﾅｼｹﾝ', full_lower: 'ヤマナシケン' }, en_name: { en: 'Yamanashi', ja: 'Yamanasi' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '20', name: '長野県', kana_name: { half_upper: 'ﾅｶﾞﾉｹﾝ', full_lower: 'ナガノケン' }, en_name: { en: null, ja: 'Nagano' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '21', name: '岐阜県', kana_name: { half_upper: 'ｷﾞﾌｹﾝ', full_lower: 'ギフケン' }, en_name: { en: 'Gifu', ja: 'Gihu' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '22', name: '静岡県', kana_name: { half_upper: 'ｼｽﾞｵｶｹﾝ', full_lower: 'シズオカケン' }, en_name: { en: 'Shizuoka', ja: 'Sizuoka' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '23', name: '愛知県', kana_name: { half_upper: 'ｱｲﾁｹﾝ', full_lower: 'アイチケン' }, en_name: { en: 'Aichi', ja: 'Aiti' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '24', name: '三重県', kana_name: { half_upper: 'ﾐｴｹﾝ', full_lower: 'ミエケン' }, en_name: { en: null, ja: 'Mie' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '25', name: '滋賀県', kana_name: { half_upper: 'ｼｶﾞｹﾝ', full_lower: 'シガケン' }, en_name: { en: 'Shiga', ja: 'Siga' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '26', name: '京都府', kana_name: { half_upper: 'ｷﾖｳﾄﾌ', full_lower: 'キョウトフ' }, en_name: { en: 'Kyoto', ja: 'Kyôto' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '27', name: '大阪府', kana_name: { half_upper: 'ｵｵｻｶﾌ', full_lower: 'オオサカフ' }, en_name: { en: 'Osaka', ja: 'Ôsaka' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '28', name: '兵庫県', kana_name: { half_upper: 'ﾋﾖｳｺﾞｹﾝ', full_lower: 'ヒョウゴケン' }, en_name: { en: 'Hyogo', ja: 'Hyôgo' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '29', name: '奈良県', kana_name: { half_upper: 'ﾅﾗｹﾝ', full_lower: 'ナラケン' }, en_name: { en: null, ja: 'Nara' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '30', name: '和歌山県', kana_name: { half_upper: 'ﾜｶﾔﾏｹﾝ', full_lower: 'ワカヤマケン' }, en_name: { en: null, ja: 'Wakayama' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '31', name: '鳥取県', kana_name: { half_upper: 'ﾄﾂﾄﾘｹﾝ', full_lower: 'トットリケン' }, en_name: { en: null, ja: 'Tottori' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '32', name: '島根県', kana_name: { half_upper: 'ｼﾏﾈｹﾝ', full_lower: 'シマネケン' }, en_name: { en: 'Shimane', ja: 'Simane' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '33', name: '岡山県', kana_name: { half_upper: 'ｵｶﾔﾏｹﾝ', full_lower: 'オカヤマケン' }, en_name: { en: null, ja: 'Okayama' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '34', name: '広島県', kana_name: { half_upper: 'ﾋﾛｼﾏｹﾝ', full_lower: 'ヒロシマケン' }, en_name: { en: 'Hiroshima', ja: 'Hirosima' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '35', name: '山口県', kana_name: { half_upper: 'ﾔﾏｸﾞﾁｹﾝ', full_lower: 'ヤマグチケン' }, en_name: { en: 'Yamaguchi', ja: 'Yamaguti' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '36', name: '徳島県', kana_name: { half_upper: 'ﾄｸｼﾏｹﾝ', full_lower: 'トクシマケン' }, en_name: { en: 'Tokushima', ja: 'Tokusima' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '37', name: '香川県', kana_name: { half_upper: 'ｶｶﾞﾜｹﾝ', full_lower: 'カガワケン' }, en_name: { en: null, ja: 'Kagawa' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '38', name: '愛媛県', kana_name: { half_upper: 'ｴﾋﾒｹﾝ', full_lower: 'エヒメケン' }, en_name: { en: null, ja: 'Ehime' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '39', name: '高知県', kana_name: { half_upper: 'ｺｳﾁｹﾝ', full_lower: 'コウチケン' }, en_name: { en: 'Kochi', ja: 'Kôti' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '40', name: '福岡県', kana_name: { half_upper: 'ﾌｸｵｶｹﾝ', full_lower: 'フクオカケン' }, en_name: { en: 'Fukuoka', ja: 'Hukuoka' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '41', name: '佐賀県', kana_name: { half_upper: 'ｻｶﾞｹﾝ', full_lower: 'サガケン' }, en_name: { en: null, ja: 'Saga' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '42', name: '長崎県', kana_name: { half_upper: 'ﾅｶﾞｻｷｹﾝ', full_lower: 'ナガサキケン' }, en_name: { en: null, ja: 'Nagasaki' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '43', name: '熊本県', kana_name: { half_upper: 'ｸﾏﾓﾄｹﾝ', full_lower: 'クマモトケン' }, en_name: { en: null, ja: 'Kumamoto' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '44', name: '大分県', kana_name: { half_upper: 'ｵｵｲﾀｹﾝ', full_lower: 'オオイタケン' }, en_name: { en: 'Oita', ja: 'Ôita' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '45', name: '宮崎県', kana_name: { half_upper: 'ﾐﾔｻﾞｷｹﾝ', full_lower: 'ミヤザキケン' }, en_name: { en: null, ja: 'Miyazaki' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '46', name: '鹿児島県', kana_name: { half_upper: 'ｶｺﾞｼﾏｹﾝ', full_lower: 'カゴシマケン' }, en_name: { en: 'Kagoshima', ja: 'Kagosima' }, start_date: '1947-05-03', end_date: null, note: null },
  { code: '47', name: '沖縄県', kana_name: { half_upper: 'ｵｷﾅﾜｹﾝ', full_lower: 'オキナワケン' }, en_name: { en: null, ja: 'Okinawa' }, start_date: '1972-05-15', end_date: null, note: '適用開始年月日は、「琉球諸島及び大東諸島に関する日本国とアメリカ合衆国との間の協定」(昭和47年3月21日条約第2号)の効力発生の日(昭和47年5月15日)としている。'}
]

export default prefectures

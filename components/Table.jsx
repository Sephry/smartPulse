import React from "react";

const Table = ({ list }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Tarih
          </th>
          <th scope="col" className="px-6 py-3">
            Toplam İşlem Miktarı (MWh)
          </th>
          <th scope="col" className="px-6 py-3">
            Toplam İşlem Tutarı (TL)
          </th>
          <th scope="col" className="px-6 py-3">
            Ağırlık Ortalama Fiyatı (TL/MWh)
          </th>
        </tr>
      </thead>

      <tbody>
        {list.map((item, i) => (
          <tr key={i} className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {item.date}
            </th>
            <td className="px-6 py-4 ">
              {Math.trunc(item.toplamIslemMiktari)} ₺
            </td>
            <td className="px-6 py-4">{item.toplamIslemTutari}</td>
            <td className="px-6 py-4">
              {Math.trunc(item.agirlikliOrtalamaFiyat)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

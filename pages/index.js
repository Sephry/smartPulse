import React, { useEffect, useState } from "react";
import axios from "axios";

import Table from "@/components/Table";
import Circular from "@/components/Circular";

export default function Home({ deneme }) {
  const [data, setData] = useState();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      axios({
        url: "/api/service",
        method: "GET",
      })
        .then((response) => {
          setData(response.data.body);
          setIsLoading(false);
        })
        .catch(() => {});
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const listItems = [];

    if (data) {
      data.intraDayTradeHistoryList.forEach((item) => {
        let toplamIslemTutari = (item.price * item.quantity) / 10;
        let toplamIslemMiktari = item.quantity / 10;
        let agirlikliOrtalamaFiyat = toplamIslemTutari / toplamIslemMiktari;

        // sadece Ph olanları almak için
        if (item.conract.startsWith("PH")) {
          if (!listItems.find((i) => i.conract === item.conract)) {
            // AYNI CONRACT YOKSA

            listItems.push({
              conract: item.conract,
              date: dateToString(item.conract),
              toplamIslemTutari,
              toplamIslemMiktari,
              agirlikliOrtalamaFiyat,
            });
          } else {
            // AYNI CONRACT VARSA

            //burada aynı olan contractın hangi indexde oldugunu buluyoruz
            let index = listItems.indexOf(
              listItems.find((i) => i.conract === item.conract)
            );

            // burada contractı ekliyoruz
            listItems[index] = {
              conract: item.conract,
              date: dateToString(item.conract),

              toplamIslemTutari:
                listItems[index].toplamIslemTutari + toplamIslemTutari,

              toplamIslemMiktari:
                listItems[index].toplamIslemMiktari + toplamIslemMiktari,
              agirlikliOrtalamaFiyat:
                listItems[index].agirlikliOrtalamaFiyat +
                agirlikliOrtalamaFiyat,
            };
          }
        }
      });
      setList(listItems);
      console.log(listItems);
    }
  }, [data]);

  function dateToString(date) {
    let year = "20" + date.substr(2, 2);
    let mounth = date.substr(4, 2);
    let day = date.substr(6, 2);
    let hour = date.substr(8, 2);

    return year + " " + mounth + " " + day + " " + hour + ":" + "00";
  }

  return (
    <div className="relative overflow-x-auto">
      {isLoading ? (
        <div className="h-screen w-screen flex justify-center items-center ">
          <Circular />
          Yükleniyor.. Lütfen Bekleyiniz.
        </div>
      ) : (
        <Table list={list} />
      )}
    </div>
  );
}

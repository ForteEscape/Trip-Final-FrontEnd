<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { toRaw } from "vue";
export default {
  name: "KakaoMap",
  data() {
    return {
      // markerPositions1: [
      //   [33.452278, 126.567803],
      //   [33.452671, 126.574792],
      //   [33.451744, 126.572441],
      // ],
      // markerPositions2: [
      //   [37.499590490909185, 127.0263723554437],
      //   [37.499427948430814, 127.02794423197847],
      //   [37.498553760499505, 127.02882598822454],
      //   [37.497625593121384, 127.02935713582038],
      //   [37.49629291770947, 127.02587362608637],
      //   [37.49754540521486, 127.02546694890695],
      //   [37.49646391248451, 127.02675574250912],
      // ],
      markers: [],
    };
  },
  mounted() {
    console.log("카카오맵 마운트");
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0fec12a978cde1e45de3863164ab1eda&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    }
  },
  methods: {
    test: function (param) {
      alert("test 호출 성공");
      console.log("파라미터 : " + param);
    },

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },

    // displayMarker() :
    // 마커 좌표의 배열을 입력하면 해당 마커를 띄웁니다.
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map((position, index) => {
          const marker = new kakao.maps.Marker({
            clickable: true,
            map: toRaw(this.map),
            position,
            info: `${index}번 마커`,
          });

          // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
          var iwContent = `
        <div style="padding:5px; width: 6rem"; height:4rem>
          <button id="planButton-${index}">계획에 추가</button>
          <button id="detailButton-${index}">상세 정보</button>
        </div>`,
            iwRemoveable = true;

          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          let map = toRaw(this.map);

          kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
            // infowindow가 열릴 때 버튼에 이벤트 리스너 추가
            this.$nextTick(() => {
              document
                .getElementById(`planButton-${index}`)
                .addEventListener("click", () => {
                  alert(`계획에 추가 버튼 클릭 - ${index}번 마커`);
                });
              document
                .getElementById(`detailButton-${index}`)
                .addEventListener("click", () => {
                  alert(`상세 정보 버튼 클릭 - ${index}번 마커`);
                });
            });
          });

          return marker;
        });

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        toRaw(this.map).setBounds(bounds);
      }
    },
    //displayMarkers 종료
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 45rem;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>

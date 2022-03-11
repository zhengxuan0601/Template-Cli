/**
 * 获取当前位置经纬度及城市地名信息
 */
interface PositionInterface {
  cityName: string
  lat: number
  lng: number
}
export function getLocationPosition (): Promise<PositionInterface> {
  return new Promise(resolve => {
    AMap.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000
      })
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      function onComplete (data: any) {
        resolve({
          cityName: data.addressComponent.city,
          lat: data.position.lat,
          lng: data.position.lng
        })
      }
    })
  })
}

/**
 * 根据城市名称获取当前城市的天气信息
 * @param { String } cityName 城市名称
 */
export function getCityWeather <T> (cityName: string): Promise<T> {
  return new Promise(resolve => {
    AMap.plugin('AMap.Weather', function () {
      const weather = new AMap.Weather()
      weather.getLive(cityName, function (_err: Error, data: T) {
        resolve(data)
      })
    })
  })
}

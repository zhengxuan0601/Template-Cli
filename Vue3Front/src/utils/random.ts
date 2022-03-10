/**
 * 根据起点和终点获取中间任意值
 * @param { number } min 区间最小值
 * @param { number } max 区间最大值
 * @return { number }
 */
export function getRandomNum (min: number, max: number): number {
  const t = Math.random() * (max - min) + min
  return t
}

/**
 * 获取十六进制指定颜色集合中随机一种颜色
 */
export function getRandomColor (): string {
  const colorList: Array<string> = ['#2080f780', '#e9690080', '#f1802380', '#23f1a580', '#23a5f180', '#3950f180', '#a239f180', '#f139c180', '#f1396c80', '#e80c4980', '#e8e10c80', '#ef342180']
  return colorList[Math.floor(getRandomNum(0, colorList.length))]
}

/**
 * 获取随机文字
 */
export function getRandomText (): string {
  const textList: Array<string> = ['VUE', 'JQUERY', 'REACT', 'HTML', 'CSS', 'JAVASCRIPT', 'JAVA', 'C#', 'C++', 'PHP', 'PHONY', 'GO', 'TYPESCRIPT', 'ES6', 'ES7', 'ES8', 'PWA', 'WEBPACK', 'C']
  return textList[Math.floor(getRandomNum(0, textList.length))]
}

/**
 * 获取rgb颜色列表中的指定一种颜色
 */
export function getRandomRGB (): number[] {
  const RGBList: Array<Array<number>> = [[28, 129, 230], [158, 28, 230], [230, 155, 28], [230, 28, 200], [230, 28, 51], [22, 191, 130], [22, 230, 105], [230, 108, 22], [230, 22, 224]]
  return RGBList[Math.floor(getRandomNum(0, RGBList.length))]
}

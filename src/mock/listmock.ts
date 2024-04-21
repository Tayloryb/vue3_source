export type MockListItem = {
  id: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
  ratio: number;
  pictures: string[];
  pictureStatus: 'pending' | 'processing' | 'finished' | 'failed'
}
export const getMockList = (): Promise<MockListItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: MockListItem[] = []
      for (let i = 0; i < 500; i++) {
        const picturesNums = Math.floor(Math.random() * 4) + 1;
        const pictures = [];
        for (let j = 0; j < picturesNums; j++) {
          pictures.push(`https://source.unsplash.com/random/300x300?sig=${i}${j}`);
        }
        data.push({
          id: i,
          title: `Title ${i}`,
          content: `Content ${i}`,
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
          ratio: 1,
          pictures: pictures,
          pictureStatus: 'pending'
        });
      }
      resolve(data);
    }, 500);
  })
}
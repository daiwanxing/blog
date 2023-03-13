export default [
    {
       text: "Introduction",
       items: [
          {
             text: "深入了解 Transition",
             link: "/content/vue/transition",
          },
       ],
    },
 ];
 

//  找到content 目录下的每个一级子目录，获取该子目录下的每个 markdown 文件的一级标题
//  作为 text，link的值取子目录名 + markdown文件名
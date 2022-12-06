import Mock from 'mockjs';

const record_root = Mock.mock('/\/records', 'get', () => {
  var subitems = [
    {
      ty: "folder",
      path: ["records", "foo"],
      ctime: new Date(2022, 11, 26, 16, 9, 21).toLocaleString(),
      mtime: new Date(2022, 11, 26, 16, 9, 21).toLocaleString(),
    },
    {
      ty: "file",
      path: ["records", "bar.txt"],
      ctime: new Date(2022, 11, 26, 16, 9, 22).toLocaleString(),
      mtime: new Date(2022, 11, 26, 16, 9, 22).toLocaleString(),
    },
  ];
  return {"path": ["records"], "subitems": subitems};
});
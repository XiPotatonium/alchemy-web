import Mock, { MockjsRequestOptions } from 'mockjs';

/*
Mock.mock(
    "/api/getRecords", "get",
    (options) => {
        var subitems = [
            // Same as FileInfoProto
            { ty: "folder", path: ["foo"], ctime: Mock.Random.datetime(), mtime: Mock.Random.datetime() },
            { ty: "file", path: ["bar.txt"], ctime: Mock.Random.datetime(), mtime: Mock.Random.datetime() },
            { ty: "file", path: ["bar.html"], ctime: Mock.Random.datetime(), mtime: Mock.Random.datetime() },
        ];
        return { "path": [], "subitems": subitems };
    }
);
*/
export default [
    {
        url: "/api/getRecords",
        method: "get",
        // `options` is actually `MockjsRequestOptions`
        response: (options: any) => {
            var subitems = [
                // Same as FileInfoProto
                { ty: "folder", path: ["foo"], ctime: Mock.Random.datetime(), mtime: Mock.Random.datetime() },
                { ty: "file", path: ["bar.txt"], ctime: Mock.Random.datetime(), mtime: Mock.Random.datetime() },
                { ty: "file", path: ["bar.html"], ctime: Mock.Random.datetime(), mtime: Mock.Random.datetime() },
            ];
            return { "path": [], "subitems": subitems };
        },
    },
    {
        url: "/api/getRecords/:path+",
        method: "get",
        // `options` is actually `MockjsRequestOptions`
        response: (options: any) => {
            var pathsegs: string[] = options.query["path"];
            var subitems = [
                // Same as FileInfoProto
                { ty: "folder", path: pathsegs.concat(["foo"]), ctime: Mock.Random.datetime(), mtime: Mock.Random.datetime() },
                { ty: "file", path: pathsegs.concat(["bar.txt"]), ctime: Mock.Random.datetime(), mtime: Mock.Random.datetime() },
            ];
            return { "path": pathsegs, "subitems": subitems };
        },
    },
]
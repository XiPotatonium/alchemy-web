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
        url: "/api/lsFiles",
        method: "get",
        response: () => {
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
        url: "/api/lsFiles/:path+",
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
    {
        url: "/api/getSettings",
        method: "get",
        response: () => {
            return {
               "theme": "light",
               "mail_fetch_period": 10     // s
            }
        }
    },
    {
        url: "/api/getInfo",
        method: "get",
        response: () => {
            return {
                "pwd": "/data/homexx/xxx/pydemo",
                // "doc": "# " + Mock.Random.title() + `
                //     \n\n[Github repo](https://github.com/XiPotatonium/alchemy-web)\n\n
                // ` + Mock.Random.paragraph() + "\n\n" + Mock.Random.cparagraph() + "\n"
            }
        }
    },
    {
        url: "/api/getMails",
        method: "get",
        response: {
            "mails|7": [{
                "id": "@guid",
                "title": "@title",
                "text": "@paragraph \n @cparagraph",
                "time": "@datetime",
                "sender": {
                    "tag": "@word",
                    "category|1": ["alchemy.runner.Trainer", "alchemy.runner.Tester"],
                    "ctime": "@datetime",
                    "dir": "./records/@word/@word/@word"
                },
                "level|1": ["error", "warning", "info", "debug", "other"],
                "read": "@boolean",
            }]
        }
    },
    {
        url: "/api/setSettings",
        method: "post",
        // `options` is actually `MockjsRequestOptions`
        response: (options: any) => {
            return options.body;
        }
    }
]
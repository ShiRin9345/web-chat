const dotenv = require('dotenv')
const OSS = require('ali-oss')

dotenv.config()
const config = {
  region: 'oss-cn-beijing',
  bucket: 'shirin-123',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
}

const client = new OSS(config)

const progress = (p, _checkpoint) => {
  // Object的上传进度。
  console.log(p)
}

async function multipartUpload() {
  try {
    const pathUrl =
      './TCPIP详解 卷1协议原书第2版 凯文 R 福尔 Kevin R Fall etc Z-Library.pdf'
    const result = await client.multipartUpload(
      'TCPIP详解 卷1协议原书第2版 凯文 R 福尔 Kevin R Fall etc Z-Library.pdf',
      pathUrl,
      {
        progress,
        meta: {
          year: 2020,
          people: 'test',
        },
      },
    )
    console.log(result)
    // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。
    const head = await client.head('exampledir/exampleobject.txt')
    console.log(head)
  } catch (e) {
    // 捕获超时异常。
    if (e.code === 'ConnectionTimeoutError') {
      console.log('TimeoutError')
      // do ConnectionTimeoutError operation
    }
    console.log(e)
  }
}

multipartUpload()

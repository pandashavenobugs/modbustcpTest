const Modbus = require('jsmodbus');

const net = require('net');


const socket = new net.Socket();

const options = {
  'host':'192.168.0.68',
  'port':'502'
}

const client = new Modbus.client.TCP(socket,1);


socket.on('connect',()=>{
  console.log('connect');
  // client.readHoldingRegisters(3,1).then(resp=>{
  //   console.log(resp.response)
  // })
  client.readHoldingRegisters(2,2).then((resp)=>{
    //UINT32 READING
    //console.log(resp.response.body);
    const testData =resp.response.body.values;
    const testData1 = resp.response.body.valuesAsArray;
    const uint32Data = (resp.response.body.values[0])+(resp.response.body.values[1]<<16); //as uint32data
    const newBuffer = Buffer.from(resp.response.body.valuesAsBuffer);
    
    //console.log(uint32Data);
    //bufferData = resp.response.body.valuesAsBuffer.
    //const bufferData1 = resp.response.body.valuesAsBuffer.readUInt32BE(1);
    
    //console.log('testData :' +testData);
    //console.log('testData1 :'+testData1)
    
    //console.log(uint16ToFloat32(54464,1));
    

    
  }).catch(error=>{
    //console.log(error);
  })
  client.readHoldingRegisters(4,2).then((resp)=>{
    // REAL DATA READING positive and negative 
    //https://stackoverflow.com/questions/56257673/reading-32-bit-float-from-modbus-tcp-using-node-red/67263659#67263659
    console.log(resp.response.body);
    const testData =resp.response.body.values;
    const testData1 = resp.response.body.valuesAsArray;
    //const uint32Data = (resp.response.body.values[0])+(resp.response.body.values[1]<<16);
    // const newBuffer = Buffer.from(resp.response.body.valuesAsBuffer);
    
    //console.log(uint32Data);
    //bufferData = resp.response.body.valuesAsBuffer.
    //const bufferData1 = resp.response.body.valuesAsBuffer.readUInt32BE(1);
    
    //console.log('testData :' +testData);
    //console.log('testData1 :'+testData1)
    const buf = Buffer.allocUnsafe(4);
    
    buf.writeUInt16BE(resp.response.body.values[0],2);
    buf.writeUInt16BE(resp.response.body.values[1],0);
    const newBuf = buf.readFloatBE(0);
    console.log('newBuff :' +newBuf);
    //console.log(uint16ToFloat32(54464,1));
    

    
  }).catch(error=>{
    //console.log(error);
  })
  client.readHoldingRegisters(0,1).then((resp)=>{
    //https://stackoverflow.com/questions/61775157/how-can-i-convert-negative-binary-number-to-int
    //reading 16 bit data
    //console.log(resp.response.body);
    //const testData =resp.response.body.values;
    //const testData1 = resp.response.body.valuesAsArray;
    
    //console.log('testData :' +testData);
    //console.log('testData1 :'+testData1);

    // to read negative 16 bit integer
    if(resp.response.body.values[0]> 32767 ){
      //console.log(resp.response.body.values[0]-65536); to read negative data
    }
    
  }).catch(error=>{
    //console.log(error);
  })

  client.readHoldingRegisters(6,2).then((resp)=>{
    //https://stackoverflow.com/questions/61775157/how-can-i-convert-negative-binary-number-to-int
    //reading 32 bit integer data
    console.log(resp.response.body);
    const testData =resp.response.body.values;
    const testData1 = resp.response.body.valuesAsArray;
    
    console.log('testData :' +testData);
    console.log('testData1 :'+testData1);
    const uint32Data = (resp.response.body.values[0])+(resp.response.body.values[1]<<16); //as uint32data
    console.log(uint32Data);
    // to read negative 16 bit integer
    if(resp.response.body.values[0]> 32767 ){
      //console.log(resp.response.body.values[0]-65536); to read negative data
    }
    
  }).catch(error=>{
    //console.log(error);
  })
})

socket.connect(options);

// socket.destroy()
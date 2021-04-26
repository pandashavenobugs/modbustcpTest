const Modbus = require('jsmodbus');

const net = require('net');

const modbustest = Modbus.client.tcp.complete({

})
const socket = new net.Socket();

const options = {
  'host':'192.168.0.65',
  'port':'502'
}

const client = new Modbus.client.TCP(socket,1);


socket.on('connect',()=>{
  console.log('connect');
  // client.readHoldingRegisters(3,1).then(resp=>{
  //   console.log(resp.response)
  // })
  client.readHoldingRegisters(2,2).then((resp)=>{
    console.log(resp.response.body);
    const testData =resp.response.body.values;
    const testData1 = resp.response.body.valuesAsArray;
    const bufferData = resp.response.body.valuesAsBuffer;
    const newBuffer = Buffer.from(resp.response.body.valuesAsBuffer);
    const newData =new Int32Array(newBuffer);
    console.log(newData);
    
    //bufferData = resp.response.body.valuesAsBuffer.
    //const bufferData1 = resp.response.body.valuesAsBuffer.readUInt32BE(1);
    
    console.log('testData :' +testData);
    console.log('testData1 :'+testData1)
    
    //console.log(uint16ToFloat32(54464,1));
    

    
  }).catch(error=>{
    //console.log(error);
  })
  // client.writeSingleRegister(0,6).then(resp=>{
  //   console.log(resp)
  // }).catch(err=>{

  // })
})

function uint16ToFloat32(low, high) {
  var buffer = new ArrayBuffer(4);
  var intView = new Uint16Array(buffer);
  var floatView = new Float32Array(buffer);

  intView[0] = low;
  intView[1] = high;
  return floatView[0];
}
function float32ToUint16(value) {
  var buffer = new ArrayBuffer(4);
  var intView = new Uint16Array(buffer);
  var floatView = new Float32Array(buffer);

  floatView[0] = value;
  return [intView[0], intView[1]];
}
socket.connect(options);

// socket.destroy()
import './App.css';
import React, { useState } from 'react';
import { NCALayerClient } from 'ncalayer-js-client';

function RemoteApp() {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const signFile = async () => {
    if (!selectedFile || !firstName || !lastName || !phoneNumber) {
      alert('Пожалуйста, заполните все поля и выберите файл для подписи.');
      return;
    }


    async function connectAndSign() {
      const ncalayerClient = new NCALayerClient();
    
      try {
        await ncalayerClient.connect();
      } catch (error) {
        alert(`Не удалось подключиться к NCALayer: ${error.toString()}`);
        return;
      }
    
      const documentInBase64 = 'MTEK';
    
      let base64EncodedSignature;
      try {
        base64EncodedSignature = await ncalayerClient.basicsSignCMS(
          NCALayerClient.basicsStoragesAll,
          documentInBase64,
          NCALayerClient.basicsCMSParamsDetached,
          NCALayerClient.basicsSignerSignAny,
        );
      } catch (error) {
        if (error.canceledByUser) {
          alert('Действие отменено пользователем.');
        }
    
        alert(error.toString());
        return;
      }
    
      return base64EncodedSignature;
    }


    try {
      connectAndSign()
      console.log('Подписанные данные:',);
      // Обработайте подписанные данные
    } catch (error) {
      console.error('Ошибка при подписи файла:', error);
      alert('Ошибка при подписи файла.');
    }
  };
   
  return (
    <div>
        <div className="navend">
            <h1 className = "h1">Remote Form</h1>
            <div className="homediv">
              <input type="text" placeholder="Имя" value={firstName} onChange={handleInputChange(setFirstName)} />
              <input type="text" placeholder="Фамилия" value={lastName} onChange={handleInputChange(setLastName)} />
              <input type="tel" placeholder="Номер телефона" value={phoneNumber} onChange={handleInputChange(setPhoneNumber)} />
              <input type="file" onChange={handleFileChange} />
              <button onClick={signFile}>Подписать</button>
            </div>
        </div>
    </div>
    );
}

export default RemoteApp;

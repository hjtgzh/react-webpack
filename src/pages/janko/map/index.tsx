import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map, Marker, InfoWindow } from 'react-amap';
import { getJankoDistrictsList } from '@/stores/janko';
import styles from './style.less';

const gaode_key = (window as any).JANKO.amapkey;

const CMap: React.FC = () => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [position, setPosition] = useState({
    longitude: 113.686037,
    latitude: 34.775838,
  });
  const [address, setAddress] = useState('');

  /* store里面数据 */
  const { districtsList } = useSelector((state) => state.janko);

  /* dispatch动作 */
  const dispatch = useDispatch();

  /* 页面首次加载 */
  useEffect(() => {
    dispatch(
      getJankoDistrictsList({
        key: gaode_key,
        keywords: '河南省',
        subdistrict: 2,
        extensions: 'base',
      }),
    );
  }, [dispatch]);

  const plugins: any = [
    'MapType',
    'Scale',
    'OverView',
    // 'ControlBar', // v1.1.0 新增
    {
      name: 'ToolBar',
      options: {
        visible: true, // 不设置该属性默认就是 true
        onCreated(_ins) {
          // console.log(ins);
        },
      },
    },
  ];

  const flatten = (list = [], key, flattenList: any = []) => {
    list.forEach((item: any) => {
      if (item[key].length > 0) {
        flatten(item[key], key, flattenList);
      } else {
        flattenList.push(item);
      }
    });
    return flattenList;
  };

  // console.log('flatten', flatten(districtsList, 'districts'));

  function flattenDistricts(districtsList = []) {
    let flattenList: any = [];
    let address = '';
    districtsList.forEach((district: any) => {
      if (district.districts.length > 0) {
        const { name } = district;
        address = `${address} ${name}`;
        // address = name;
        flattenList = flattenList.concat(flattenDistricts(district.districts));
      }
      const { adcode, center, citycode, name, level } = district;
      const addressMore = `${address} ${name}`;
      flattenList.push({
        adcode,
        citycode,
        name,
        level,
        position: {
          longitude: center.split(',')[0],
          latitude: center.split(',')[1],
        },
        address: addressMore,
      });
    });
    return flattenList;
  }

  console.log('districtsList', districtsList);

  console.log('list', flattenDistricts(districtsList));

  const events = {
    click: (e) => {
      console.log('clicked', e);
      const { position, address } = e.target.w.extData;
      setAddress(address);
      setPosition(position);
      setInfoVisible(true);
    },
  };

  const html = `<div><h4>信息：</h4><p>您此时所在的位置是</p><p>${address}</p></div>`;

  return (
    <div className={styles.map}>
      <Map plugins={plugins} amapkey={gaode_key}>
        <InfoWindow
          position={position}
          visible={infoVisible}
          isCustom={false}
          content={html}
        />
        {flattenDistricts(districtsList).map((district: any) => {
          const { adcode, name, position } = district;
          return (
            <Marker
              key={`${adcode}_${name}`}
              position={position}
              events={events}
              extData={district}
              title={name}
            ></Marker>
          );
        })}
      </Map>
    </div>
  );
};

export default CMap;

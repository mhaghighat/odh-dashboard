import * as React from 'react';
// import { useSelector } from 'react-redux';
// import { State } from '../redux/types';
import { fetchBYONImages } from '../services/imagesService';
import { BYONImage } from '../types';
import { POLL_INTERVAL } from './const';
//import { useDeepCompareMemoize } from './useDeepCompareMemoize';

export const useWatchBYONImages = (): {
  images: BYONImage[];
  loaded: boolean;
  loadError: Error | undefined;
  forceUpdate: () => void;
} => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loadError, setLoadError] = React.useState<Error>();
  const [images, setImages] = React.useState<BYONImage[]>([]);
  const forceUpdate = () => {
    setLoaded(false);
    fetchBYONImages()
      .then((data: BYONImage[]) => {
        setLoaded(true);
        setLoadError(undefined);
        setImages(data);
      })
      .catch((e) => {
        setLoadError(e);
      });
  };

  React.useEffect(() => {
    let watchHandle;
    const watchImages = () => {
      fetchBYONImages()
        .then((data: BYONImage[]) => {
          setLoaded(true);
          setLoadError(undefined);
          setImages(data);
        })
        .catch((e) => {
          setLoadError(e);
        });
      watchHandle = setTimeout(watchImages, POLL_INTERVAL);
    };
    watchImages();

    return () => {
      if (watchHandle) {
        clearTimeout(watchHandle);
      }
    };
    // Don't update when components are updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { images: images || [], loaded, loadError, forceUpdate };
};

import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

let count = 0;
let count2 = 0;

export const updateResource1 = async (req: Request, res: Response): Promise<void> => {
  const data = req.body.data;
  console.log('data = ', data);

  if (data) {
    res.status(200).json({
      message: 'update resource1 api',
    });
  } else {
    res.status(400).json({
      message: 'missing data in req body',
    });
  }
};

export const updateResource2 = async (req: Request, res: Response): Promise<void> => {
  const data = req.body.data;
  console.log('data = ', data);

  if (data) {
    res.status(200).json({
      message: 'update resource2 api',
    });
  } else {
    res.status(400).json({
      message: 'missing data in req body',
    });
  }
};

export const revertUpdateResource1 = async (): Promise<void> => {
  console.log('revert update resource1 api');
};

export const updateRemoteApi = async (req: Request, res: Response): Promise<void> => {
  const response = await sendResource1Request();
  if (response) {
    const responseData = response.data;
    console.log('responseData = ', responseData);

    if (response.status === 200 && responseData) {
      const response = await sendResource2Request();
      if (response) {
        const responseData = response.data;
        console.log('responseData2 = ', responseData);
      } else {
        count2 += 1;
      }
    }
  } else {
    count += 1;
  }

  console.log('count = ', count);
  console.log('count2 = ', count2);
  if (count === 0 && count2 === 0) {
    res.status(200).json({
      message: 'updateRemoteApi success',
    });
  }
  if ((count >= 1 && count <= 3) || (count2 >= 1 && count2 <= 3)) {
    res.status(400).json({
      message: 'updateRemoteApi fail',
    });
  }
  if (count > 3) {
    count = 0;

    res.status(400).json({
      message: 'updateRemoteApi fail',
    });
  }
  if (count2 > 3) {
    await revertUpdateResource1();
    count2 = 0;

    res.status(400).json({
      message: 'updateRemoteApi fail',
    });
  }
};

export const updateRemoteApiTest = async (): Promise<AxiosResponse> => {
  const response = await sendResource1Request();
  if (response) {
    const responseData = response.data;

    if (response.status === 200 && responseData) {
      const response = await sendResource2Request();
      if (response) {
        const responseData = response.data;
      } else {
        count2 += 1;
      }
    }
  } else {
    count += 1;
  }

  return response;
};

export const getCount = (): number => {
  return count;
};

export const getCount2 = (): number => {
  return count2;
};

async function sendResource1Request() {
  let response = null;
  try {
    response = await axios.put(`http://localhost:3000/api/resource1`, {
      data: 'news1',
    });
  } catch (e) {
    console.log('error = ', e.message);
  }
  return response;
}

async function sendResource2Request() {
  let response = null;
  try {
    response = await axios.put(`http://localhost:3000/api/resource2`, {
      data: 'news2',
    });
  } catch (e) {
    console.log('error = ', e.message);
  }

  return response;
}

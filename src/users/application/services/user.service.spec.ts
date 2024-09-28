import { Test, TestingModule } from '@nestjs/testing';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserService } from './user.service';
import { cacheMock, httpServiceMock, configServiceMock } from '../../../common/domain/mocks';

describe('UserService', () => {
  let service: UserService;
  let httpService: HttpService;
  let cache: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CACHE_MANAGER,
          useValue: cacheMock
        },
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    cache = module.get<Cache>(CACHE_MANAGER);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToken', () => {
    it('should return cached token if it exists', async () => {
      jest.spyOn(cache, 'get').mockResolvedValue('cached_token')
      
      const token = await service['getToken']();
      
      expect(token).toBe('cached_token');
      expect(cache.get).toHaveBeenCalledWith('token');
    });

    it('should fetch new token and cache it if no cached token exists', async () => {
      const axiosResponse: AxiosResponse = {
        data: { access_token: 'new_token' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        }
      };

      jest.spyOn(cache, 'get').mockResolvedValue(null);
      jest.spyOn(httpService, 'post').mockReturnValue(of(axiosResponse));
      jest.spyOn(cache, 'set').mockResolvedValue(null);

      const token = await service['getToken']();
      
      expect(token).toBe('new_token');
      expect(cache.set).toHaveBeenCalledWith('token', axiosResponse.data);
    });

    it('should throw an HttpException if token fetch fails', async () => {
      jest.spyOn(cache, 'get').mockResolvedValue(null);
      jest.spyOn(httpService, 'post').mockReturnValue(throwError(() => new Error('Request failed')));

      await expect(service['getToken']()).rejects.toThrow(HttpException);
    });
  });

  describe('findOneUser', () => {
    it('should return cached user if it exists', async () => {
      const cachedUser = { id: '123', name: 'John Doe' };
      jest.spyOn(cache, 'get').mockResolvedValue(cachedUser);

      const user = await service.findOneUser('123');

      expect(user).toEqual(cachedUser);
      expect(cache.get).toHaveBeenCalledWith('user');
    });

    it('should fetch user from API and cache it if no cached user exists', async () => {
      const axiosResponse: AxiosResponse = {
        data: { id: '123', name: 'John Doe' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(cache, 'get').mockResolvedValue(null);
      jest.spyOn(service as any, 'getToken').mockResolvedValueOnce('token');
      jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));
      jest.spyOn(cache, 'set').mockResolvedValue(null);

      const user = await service.findOneUser('123');

      expect(user).toEqual(axiosResponse.data);
      expect(cache.get).toHaveBeenCalledWith('user');
      expect(cache.get).toHaveBeenCalledWith('token');
      expect(httpService.get).toHaveBeenCalledWith(
        'https://example.com/api/v2/users/123',
        { headers: { authorization: 'Bearer token' } },
      );
      expect(cache.set).toHaveBeenCalledWith('user', axiosResponse.data);
    });

    it('should throw an HttpException if fetching user fails', async () => {
      jest.spyOn(cache, 'get').mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => new Error('Request failed')));

      await expect(service.findOneUser('123')).rejects.toThrow(HttpException);
    });
  });

  describe('editUser', () => {
    const editUserDto = { family_name: 'Doe', given_name: 'John' };

    it('should throw an error if family_name or given_name is missing', async () => {
      await expect(service.editUser('123', { family_name: '', given_name: '' }))
        .rejects
        .toThrow(new HttpException('No fields were found to update your user.', HttpStatus.BAD_REQUEST));
    });

    it('should update user and cache the updated user', async () => {
      const axiosResponse: AxiosResponse = {
        data: editUserDto,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        }
      };

      jest.spyOn(cache, 'get').mockResolvedValue('token');
      jest.spyOn(httpService, 'patch').mockReturnValue(of(axiosResponse));
      jest.spyOn(cache, 'set').mockResolvedValue(null);

      const updatedUser = await service.editUser('123', editUserDto);

      expect(updatedUser).toEqual(editUserDto);
      expect(httpService.patch).toHaveBeenCalledWith(
        'https://example.com/api/v2/users/123',
        editUserDto,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            authorization: 'Bearer token',
          },
        },
      );
      expect(cache.set).toHaveBeenCalledWith('user', axiosResponse.data);
    });

    it('should throw an HttpException if updating user fails', async () => {
      jest.spyOn(httpService, 'patch').mockReturnValue(throwError(() => new Error('Request failed')));

      await expect(service.editUser('123', editUserDto)).rejects.toThrow(HttpException);
    });
  });
});

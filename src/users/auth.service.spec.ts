import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //! Create a fake copy of the users service
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asfjkhgas@gmail.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });
});

//! summary
// Bu test kodu, AuthService adlı bir servisin örneğini başarıyla oluşturup oluşturamadığını kontrol ediyor. Bu işlem sırasında, gerçek UsersService yerine sahte (fake) bir kopya kullanılıyor. Bu sahte kopya, find ve create metodlarını içeriyor ve bir dizi kullanıcı nesnesini simüle ediyor.

// İşte testin aşamaları ve her bir aşamanın açıklaması:

// 1. fakeUsersService adında sahte bir kullanıcı servisi oluşturulur. Bu servis, find ve create metodlarına sahiptir. find metodu boş bir diziyi döndürürken, create metodu bir kullanıcı nesnesini döndürür.

// 2. Test.createTestingModule metodu ile bir test modülü oluşturulur. Bu modül, AuthService ve sahte UsersService'i içeren bir dizi sağlayıcıyı içerir.

// 3. module.compile() metodu ile modül derlenir.

// 4. module.get(AuthService) ile AuthService'in örneği alınır.

// 5. Alınan servis expect ifadesiyle kontrol edilir. Bu ifade, servisin tanımlı olup olmadığını kontrol eder.

// Bu test, AuthService servisinin UsersService'in gerçek bir örneği olmadan da başarıyla çalışıp çalışmadığını kontrol etmek için tasarlanmıştır. Yani, UsersService'in bağımlılığı olan AuthService'i, sahte bir UsersService ile test eder. Bu, AuthService'in kullanıcı servisiyle etkileşime geçme yeteneğini kontrol etmeyi amaçlar ve bu sayede UsersService'in gerçek bir veritabanı kullanıcısı olmaksızın doğru bir şekilde çalışıp çalışmadığını test edebilirsiniz.

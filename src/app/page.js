'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function Home() {
  const [step, setStep] = useState(1);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    console.log('Form Submitted', data);
  };
  return (
    <main>
      <Card className="max-w-lg mx-auto mt-10 p-5 shadow-lg">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Name" className="mb-3" />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format',
                    },
                  }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Email" className="mb-3" />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: 'Date of Birth is required' }}
                  render={({ field }) => (
                    <Input type="date" {...field} className="mb-3" />
                  )}
                />
                {errors.dob && (
                  <p className="text-red-500">{errors.dob.message}</p>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Address Information</h2>
                <Controller
                  name="address1"
                  control={control}
                  rules={{ required: 'Address is required' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Address Line 1"
                      className="mb-3"
                    />
                  )}
                />
                {errors.address1 && (
                  <p className="text-red-500">{errors.address1.message}</p>
                )}

                <Controller
                  name="city"
                  control={control}
                  rules={{ required: 'City is required' }}
                  render={({ field }) => (
                    <Input {...field} placeholder="City" className="mb-3" />
                  )}
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Account Information</h2>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: 'Username is required' }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Username" className="mb-3" />
                  )}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}

                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <Input
                      type="password"
                      {...field}
                      placeholder="Password"
                      className="mb-3"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            )}

            <div className="flex justify-between mt-4">
              {step > 1 && <Button onClick={prevStep}>Previous</Button>}
              {step < 3 ? (
                <Button onClick={nextStep}>Next</Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

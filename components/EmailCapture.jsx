"use client";

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { captureEmail } from '../lib/supabase'

export default function EmailCapture() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')

    try {   
      const { success, error: apiError } = await captureEmail(data.email)

      if (!success) {
        setError(apiError || 'Something went wrong. Please try again.')
      } else {
        setIsSuccess(true)
        reset()
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <section className="py-10">
      <div className="max-w-md mx-auto px-4 text-center">
        {!isSuccess ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-3 bg-cyan-500 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        ) : (
          <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
            <p className="text-green-400">
              Thank you! Your email has been submitted.
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-400 mt-2">
            {error}
          </p>
        )}

        {(errors.email) && (
          <p className="text-red-400 mt-2">
            {errors.email.message}
          </p>
        )}
      </div>
    </section>
  )
}

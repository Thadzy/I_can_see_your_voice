def sieve_of_eratosthenes(limit):
    primes = []
    sieve = [True] * (limit + 1)
    for num in range(2, limit + 1):
        if sieve[num]:
            primes.append(num)
            for multiple in range(num*num, limit + 1, num):
                sieve[multiple] = False
    return primes

# Example: Find primes up to 30
print(sieve_of_eratosthenes(1000000))
